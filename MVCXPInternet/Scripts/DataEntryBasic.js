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



    var appSettings = { AppContainerId: 'formContainer' };
    var app = new DataEntryForm(appSettings).Render();

    $(".option").click(function () {
        app.Draft.SelectedValue($(this).find('.optionKey').text().trim());
        app.Draft.Age($(this).find('.optionKey').text().trim());
    });

    $(document).keydown(function (e) {
        var key = 0;
        if (e == null) {
            key = event.keyCode;
        } else { // mozilla
            key = e.which;
        }
        alert(app.Draft.SelectedIndex());
        var index = 0; // app.Draft.SelectedIndex();

        switch (key) {
            case 37: //Left
                index -= 1;
                break;
            case 38: //Up
                index -= 1;
                break;
            case 39: //Right
                index += 1;
                break;
            case 40: //Down
                index += 1;
                break;
        }

        app.Draft.SelectedIndex(index);
    });




});


function DataEntryForm(Settings) {

    var self = this;

    self.Settings = Settings;
    self.RecordCount = ko.observable(0);
    self.RecordProcessor = null;
    self.ConnectionId = null;
    self.OutputConsole = $("#messages");
    self.ErrorConsole = $("#errors");

    self.Records = ko.observableArray([]);
    self.ProcessedRecords = ko.computed(function () { return ko.utils.arrayFilter(self.Records(), function (record) { return record.Status() == 'Saved' }); }, self);
    self.PendingRecords = ko.computed(function () { return ko.utils.arrayFilter(self.Records(), function (record) { return record.Status() != 'Saved' }); }, self);



    self.Draft = ko.mapping.fromJS(new RecordVM());

    self.Render = function () {
        self.Init();
        return self;
    }

    self.Init = function () {

        self.RecordProcessor = $.connection.dataEntryHub;
        self.ConnectionId = $.connection.dataEntryHub.id;

        $.extend(self.RecordProcessor, {
            recordProcessing: self.RecordProcessing,
            recordProcessingComplete: self.RecordProcessingComplete,
            recordProcessingFailed: self.RecordProcessingFailed,
            errorOccured: self.ErrorOccured,
            connected: function () { $('#messages').append('<li>' + 'Server Event: Connected' + '</li>'); },
            disconnected: function () { $('#messages').append('<li>' + 'Server Event: Disconnected' + '</li>'); },
            reconnected: function () { $('#messages').append('<li>' + 'Server Event: Reconnected' + '</li>'); }
        });

        $.connection.hub.logging = true;
        $.connection.hub.start()
        .done(function () {
            self.RecordProcessor.initiateBatch();
            $('#messages').append('<li>' + 'Connected to server' + '</li>');
        })
        .fail(function () {
            self.ErrorConsole.html('Connection to server failed.');
            self.ErrorConsole.fadeIn("slow");
        });


        ko.applyBindings(self);
    }


    self.RecordProcessing = function (recordId, percentComplete) {
        //self.OutputConsole.append('<li>' + recordId + '( ' + percentComplete + ' complete. ) ' + '</li>');
        var record = self.GetRecord(recordId);
        record.Status('Saving ' + percentComplete + '% complete');
    }

    self.RecordProcessingComplete = function (recordId) {
        //self.OutputConsole.append('<li>' + recordId + '( Completed! ) ' + '</li>');
        var record = self.GetRecord(recordId);
        record.Status('Saved');
    }

    self.RecordProcessingFailed = function (recordId) {
        self.OutputConsole.append('<li>' + recordId + '( Failed ) ' + '</li>');
    }

    self.ErrorOccured = function (message) {
        self.ErrorConsole.html(message);
        self.ErrorConsole.fadeIn("slow");
    }



    self.GetRecord = function (id) {
        return ko.utils.arrayFirst(self.Records(), function (record) {
            return record.Id() == id;
        });
    }

    self.AddRecord = function () {
        //$('#messages').append('<li>' + 'Adding Record: ' + '</li>');
    }

    self.SubmitDraft = function () {

        var newRecord = ko.mapping.fromJS(ko.toJS(self.Draft));
        self.RecordCount(self.RecordCount() + 1);
        newRecord.Id(self.RecordCount());
        newRecord.Status('Saving');

        self.Records.push(newRecord);

        //TODO:  USE THIS snippet to trim down the fat
        //        var items = ko.toJS(this.items);
        //        var mappedItems = ko.utils.arrayMap(items, function (item) {
        //            delete item.priceWithTax;
        //            return item;
        //        });


        //$('#messages').append('<li>' + 'Submitting...' + self.RecordCount() + '</li>');
        self.RecordProcessor.processRecord(ko.mapping.toJS(newRecord), self.RecordCount())
        .done(function (result) {
            $('#messages').append('<li>' + result + '</li>');
        })
        .fail(function (error) {
            self.ErrorConsole.html('Unexpected error while processing record.');
            self.ErrorConsole.fadeIn("slow");
        });

    }

    self.Draft.Age.subscribe(function (newValue) {
        self.Draft.SelectedValue(newValue);
    });


}



function RecordVM() {

    var self = this;
    self.Id = 0;
    self.FirstName = 'fn';
    self.LastName = 'ln';
    self.Age = 0;
    self.Options = [];

    self.Options.push(ko.mapping.fromJS(new OptionVM(0, 'A', ' Another long option label Another long option label Another long option label')));
    self.Options.push(ko.mapping.fromJS(new OptionVM(1, 'B', ' Another long option label Another long option label Another long option label')));
    self.Options.push(ko.mapping.fromJS(new OptionVM(2, 'C', ' Another long option label Another long option label Another long option label')));
    self.Options.push(ko.mapping.fromJS(new OptionVM(3, 'D', ' Another long option label Another long option label Another long option label')));
    self.Options.push(ko.mapping.fromJS(new OptionVM(4, 'E', ' Another long option label Another long option label Another long option label')));
    self.Options.push(ko.mapping.fromJS(new OptionVM(5, 'F', ' Another long option label Another long option label Another long option label')));
    self.Options.push(ko.mapping.fromJS(new OptionVM(6, 'G', ' Another long option label Another long option label Another long option label')));

    $.each(self.Options, function () {
        if (this.Key() == 'D') this.Selected(true);
    });

    self.Status = 'Draft'; //['Draft', 'Working', 'Dirty', 'Saving', 'Saved', 'Failed', 'ToBeDeleted']


        

    self.SelectedValue = ko.computed({
        read: function () {
            $.each(self.Options, function () {
                if (this.Selected() == true) return this.Key();
            });
        },
        write: function (value) {
            $.each(self.Options, function () {
                this.Selected(false);
                if (this.Key().toLowerCase() == value.toLowerCase()) {
                    this.Selected(true);
                }
            });
        }

    });

    //    self.SelectedIndex = ko.computed({
    //        read: function () {
    //            
    ////            $.each(self.Options, function () {
    ////                if (this.Selected() == true) return this.Index();
    ////            });
    //        },
    //        write: function (value) {
    ////            $.each(self.Options, function () {
    ////                this.Selected(false);
    ////                if (this.Index() == parseInt(value)) {
    ////                    this.Selected(true);
    ////                }
    ////            });
    //        },
    //        deferEvaluation: true

    //    });

    //    self.SelectionCount = ko.computed({

    //        read: function () {
    //            var total = 0;
    //            $.each(self.Options, function () {
    //                if (this.Selected() == true) total = total + 1;
    //            });
    //            return total;
    //        }
    //    });
}

function FieldVM() {

}
function OptionVM(index, key, label) {

    var self = this;


    self.Index = index;
    self.Key = key;
    self.Label = label;
    self.Selected = false;


}
