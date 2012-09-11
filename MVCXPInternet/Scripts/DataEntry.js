/// <reference path="jquery-1.8.0.js" />
/// <reference path="jquery-ui-1.8.20.js" />
/// <reference path="jquery.signalR-0.5.3.js" />
/// <reference path="knockout-2.1.0.js" />

/// <reference path="knockout.mapping-latest.js" />
/// <reference path="jquery.linq-vsdoc.js" />
/// <reference path="linq-vsdoc.js" />
/// <reference path="linq.js" />
/// <reference path="jquery.linq.js" />

$(document).ready(function () {


    var recordTemplate = new RecordTemplate();
    var options = {
        AppContainerId: 'formContainer',
        ErrorConsoleId: 'errors',
        OutputConsoleId: 'messages'
    };

    var app = new DataEntryForm(recordTemplate, options).Render();

    $(document).keydown(function (e) {
        var key = 0;
        if (e == null) {
            key = event.keyCode;
        } else { // mozilla
            key = e.which;
        }

        var index = 0; // app.Draft.SelectedIndex();

        switch (key) {
            case 13: //Enter
                app.SubmitDraft();
                break;
            case 27: //Escape
                //TODO: Clear any selection/input in the control under focus
                break;
            case 32: //Space
                break;
            case 37: //Left
                break;
            case 39: //Right
                break;
            case 38: //Up
                if (app.CurrentField != null) app.CurrentField.SelectPreviousOption();
                index -= 1;
                break;
            case 40: //Down
                if (app.CurrentField != null) app.CurrentField.SelectNextOption();
                index += 1;
                break;

        }

    });


});

function DataEntryForm(recordTemplate, options) {

    var self = this;

    //App Properties
    self.Options = options;
    self.OutputConsole = $("#" + self.Options.OutputConsoleId);
    self.ErrorConsole = $("#" + self.Options.ErrorConsoleId);

    //Record Processor Properties
    self.RecordProcessor = null;
    self.ConnectionId = null;

    //Form Properties
    self.RecordTemplate = recordTemplate;
    self.Draft = ko.mapping.fromJS(new RecordVM(self.RecordTemplate));
    self.Records = ko.observableArray([]);
    self.RecordCount = ko.observable(0);
    self.CurrentField = null;

    //Computed Properties
    self.ProcessedRecords = ko.computed(function () { return ko.utils.arrayFilter(self.Records(), function (record) { return record.Status() == 'Saved' }); }, self);
    self.PendingRecords = ko.computed(function () { return ko.utils.arrayFilter(self.Records(), function (record) { return record.Status() != 'Saved' }); }, self);

    self.Render = function () {
        self.Init();
        return self;
    }

    self.Init = function () {
        self.InitRecordProcessor();

        ko.applyBindings(self);
    }

    self.InitRecordProcessor = function () {

        self.RecordProcessor = $.connection.dataEntryHub;
        self.ConnectionId = $.connection.dataEntryHub.id;

        $.extend(self.RecordProcessor, {
            recordProcessing: self.RecordProcessing,
            recordProcessingComplete: self.RecordProcessingComplete,
            recordProcessingFailed: self.RecordProcessingFailed,
            errorOccured: function (message) { self.ErrorConsole.html(message); self.ErrorConsole.fadeIn("slow"); },
            connected: function () { self.OutputConsole.append('<li>' + 'Server Event: Connected' + '</li>'); },
            disconnected: function () { self.OutputConsole.append('<li>' + 'Server Event: Disconnected' + '</li>'); },
            reconnected: function () { self.OutputConsole.append('<li>' + 'Server Event: Reconnected' + '</li>'); }
        });

        $.connection.hub.logging = true;
        $.connection.hub.start()
        .done(function () {
            self.RecordProcessor.initiateBatch();
            self.OutputConsole.append('<li>' + 'Connected to server' + '</li>');
        })
        .fail(function () {
            self.ErrorConsole.html('Connection to server failed.');
            self.ErrorConsole.fadeIn("slow");
        });

    }

    self.RecordProcessing = function (recordId, percentComplete) {
        var record = self.GetRecord(recordId);
        record.Status(percentComplete + '%');
    }

    self.RecordProcessingComplete = function (recordId) {
        var record = self.GetRecord(recordId);
        record.Status('Saved');
    }

    self.RecordProcessingFailed = function (recordId) {
        self.OutputConsole.append('<li>' + recordId + '( Failed ) ' + '</li>');
    }

    self.GetRecord = function (id) {
        return ko.utils.arrayFirst(self.Records(), function (record) {
            return record.Id() == id;
        });
    }

    self.SubmitDraft = function () {


        var newRecord = ko.mapping.fromJS(ko.toJS(self.Draft));
        self.RecordCount(self.RecordCount() + 1);
        newRecord.Id(self.RecordCount());
        newRecord.Status('Saving');



        //trim down the fat
        //        var items = ko.toJS(this.items);
        //        var mappedItems = ko.utils.arrayMap(items, function (item) {
        //            delete item.priceWithTax;
        //            return item;
        //        });

        self.Records.push(newRecord);
        
        //Reset Input Fields
        ko.utils.arrayForEach(self.Draft.Fields(), function (field) {
            field.Value('');
        });

        //PROCESS RECORD
        self.RecordProcessor.processRecord(ko.mapping.toJS(newRecord), self.RecordCount())
        .done(function (result) {
            self.OutputConsole.append('<li>' + result + '</li>');

            

        })
        .fail(function (error) {
            self.ErrorConsole.html('Unexpected error while processing record.');
            self.ErrorConsole.fadeIn("slow");
        });

    }


}

function RecordTemplate() {

    var self = this;

    self.Fields = [];

    //TODO: This needs to be constructed based on config
    $.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], function (i) {
        var field = new FieldVM('field' + i);
        $.each([1, 2, 3, 4, 5], function (j) {
            field.Options.push(new OptionVM(j.toString(), 'Another long option label Another long option label Another long option label ' + j));
        });
        self.Fields.push(field);
    });

}

function RecordVM(recordTemplate, record) {

    var self = this;

    self.RecordTemplate = recordTemplate;
    self.Id = 0;
    self.Fields = [];
    self.CurrentField;
    self.CurrentSelection;

    //Build View Model based on template
    $.each(recordTemplate.Fields, function (i) {
        var thisField = this;
        var fieldVM = new FieldVM(thisField.Label);
        $.each(thisField.Options, function (j) {
            var thisOption = this;
            //fieldVM.Options.push(ko.mapping.fromJS(new OptionVM(thisOption.Value, thisOption.Label)));
            fieldVM.Options.push(new OptionVM(thisOption.Value, thisOption.Label));
        });
        //self.Fields.push(ko.mapping.fromJS(fieldVM));
        self.Fields.push(fieldVM);
    });

    self.CurrentField = self.Fields[0];

    self.Status = 'Draft'; //['Draft', 'Working', 'Dirty', 'Saving', 'Saved', 'Failed', 'ToBeDeleted']


}

function FieldVM(label) {

    var self = this;

    self.Id = 0;
    self.Label = label;
    self.Description = 'description for' + label;
    self.HelpContent = 'Help Content for ' + label;
    self.DisplayOrder = 0;

    self.Options = [];

    self.Value = ko.observable('');

    self.Value.subscribe(function (newValue) {

        if (self.Options.length == 0) return;

        $.each(self.Options, function () {
            this.Selected(false);
            if (this.Value.toLowerCase() == newValue.toLowerCase()) this.Selected(true);
        });

    });

    self.SelectNextOption = function () {
        //TODO: Implement this
    }

    self.SelectPreviousOption = function () {
        //TODO: Implement this
    }

    self.SelectByValue = function (value) {
        //TODO: Implement this
    }

    self.SelectByIndex = function (index) {
        //TODO: Implement this
    }
}


function OptionVM(value, label) {

    var self = this;

    self.Value = value;
    self.Label = label;
    self.Selected = ko.observable(false);

}
