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



    var recordTemplateAsJson = {
        Fields: [
            { 
                DisplayOrder: 1, 
                Id: 0, 
                Required: true, 
                Label: 'Bed #', 
                Type: 'number', 
                Interface: 'textbox', 
                Options: [] 
            },
            { 
                DisplayOrder: 2, 
                Id: 1, 
                Required: true, 
                Label: 'Intub / Trach & Mech Vent', 
                Type: 'string', 
                Interface: 'dropdown', 
                Options: [
                    { Label: 'Yes', Value: 'Y', AccessKeys: ['0'] },
                    { Label: 'No', Value: 'N', AccessKeys: ['1'] }
                ] 
            },
            { 
                DisplayOrder: 3, 
                Id: 2, 
                Required: true, 
                Label: 'Date of intubation (mm/dd/yyyy)', 
                Type: 'date', 
                Interface: 'datepicker', 
                Options: [] 
            },
            { 
                DisplayOrder: 4, 
                Id: 3, 
                Label: 'Shift', 
                Type: 'string', 
                Interface: 'dropdown', 
                Options: [
                    { Label: 'AM', Value: 'AM', AccessKeys: ['0'] },
                    { Label: 'PM', Value: 'PM', AccessKeys: ['1'] }
                ] 
            },
            { 
                DisplayOrder: 5, 
                Id: 4, 
                Label: 'Sub-G ETT', 
                Type: 'string', 
                Interface: 'dropdown', 
                Options: [
                    { Label: 'Yes', Value: 'Y', AccessKeys: ['0'] },
                    { Label: 'No', Value: 'N', AccessKeys: ['1'] },
                    { Label: 'Contraindicated', Value: 'C', AccessKeys: ['2'] }
                ] 
            },
            { 
                DisplayOrder: 6, 
                Id: 5, 
                Label: 'Sub-G ETT Con', 
                Type: 'number', 
                Interface: 'dropdown', 
                Options: [
                    { DisplayOrder: '1', Value: '0', Label: 'Other' },
                    { DisplayOrder: '2', Value: '1', Label: 'Tracheostomy' }
                ] 
            },
            { 
                DisplayOrder: 7, 
                Id: 6, 
                Label: 'Location of Intubation', 
                Type: 'number', Interface: 'dropdown', 
                Options: [
                    { DisplayOrder: '1', Value: '0', Label: 'Your ICU' },
                    { DisplayOrder: '2', Value: '1', Label: 'Another ICU in your hospital' },
                    { DisplayOrder: '3', Value: '2', Label: 'Outside hospital' },
                    { DisplayOrder: '4', Value: '3', Label: 'OR' },
                    { DisplayOrder: '5', Value: '4', Label: 'Rapid Response Team (RRT)' },
                    { DisplayOrder: '6', Value: '5', Label: 'ED' },
                    { DisplayOrder: '7', Value: '6', Label: 'Cardiovascular and Interventional Laboratory (CVDL)' },
                    { DisplayOrder: '8', Value: '7', Label: 'During a code on the floor' },
                    { DisplayOrder: '9', Value: '8', Label: 'Another location not listed above' }
                ] 
            },
            { 
                DisplayOrder: 8, 
                Id: 7, 
                Label: 'Does Sub-G tube work?', 
                Type: 'string', 
                Interface: 'dropdown', 
                Options: [
                    { DisplayOrder: '1', Value: 'Y', Label: 'Yes', AccessKeys: ['0'] },
                    { DisplayOrder: '2', Value: 'N', Label: 'No', AccessKeys: ['1'] },
                    { DisplayOrder: '3', Value: 'N/A', Label: 'Not Applicable', AccessKeys: ['na','/','2'] } //Test Case
                ] 
            },
            { 
                DisplayOrder: 9, 
                Id: 8, 
                Label: 'HOB @ ≥30o', 
                Type: 'string', 
                Interface: 'dropdown', 
                Options: [
                    { DisplayOrder: '1', Value: 'Y', Label: 'Yes', AccessKeys: ['0'] },
                    { DisplayOrder: '2', Value: 'N', Label: 'No', AccessKeys: ['1'] },
                    { DisplayOrder: '3', Value: 'C', Label: 'Contraindicated', AccessKeys: ['2'] }
                ] 
            },
            { 
                DisplayOrder: 10, 
                Id: 9, 
                Label: 'HOB Con', 
                Type: 'number', 
                Interface: 'dropdown', 
                Options: [
                    { DisplayOrder: '1', Value: '0', Label: 'Other' },
                    { DisplayOrder: '2', Value: '1', Label: 'Hypotension' },
                    { DisplayOrder: '3', Value: '2', Label: 'Unstable Physiological Status' },
                    { DisplayOrder: '4', Value: '3', Label: 'Low Cardiac Index' },
                    { DisplayOrder: '5', Value: '4', Label: 'Cervical, thoracic or lumbar surgery or instability' },
                    { DisplayOrder: '6', Value: '5', Label: 'LVAD' },
                    { DisplayOrder: '7', Value: '6', Label: 'RVAD' },
                    { DisplayOrder: '8', Value: '7', Label: 'Intra aortic balloon pump' },
                    { DisplayOrder: '9', Value: '8', Label: 'Open abdomen' },
                    { DisplayOrder: '10', Value: '9', Label: 'Patient refusal' }
                ] 
            },
            { 
                DisplayOrder: 11, 
                Id: 10, 
                Label: 'Oral Care', 
                Type: 'number', 
                Interface: 'textbox', 
                Options: [] 
            },
            { 
                DisplayOrder: 12, 
                Id: 11, 
                Label: 'Oral Care Con', 
                Type: 'number', 
                Interface: 'dropdown', 
                Options: [
                    { DisplayOrder: '1', Value: '0', Label: 'Other' },
                    { DisplayOrder: '2', Value: '1', Label: 'Patient refusal' }
                ] 
            },
            { 
                DisplayOrder: 13, 
                Id: 12, 
                Label: 'Oral Care with CHG', 
                Type: 'number', 
                Interface: 'textbox', 
                Options: []  
            },
            { 
                DisplayOrder: 14, 
                Id: 13, 
                Label: 'CHG Con', 
                Type: 'number', 
                Interface: 'dropdown', 
                Options: [
                    { DisplayOrder: '1', Value: '0', Label: 'Other' },
                    { DisplayOrder: '2', Value: '1', Label: 'Patient is known to have an allergic or hypersensitivity reaction to chlorhexidine' },
                    { DisplayOrder: '3', Value: '2', Label: 'Patient is < 2 months of age' },
                    { DisplayOrder: '4', Value: '3', Label: 'There is a possibility of direct contact of CHG with meninges' },
                    { DisplayOrder: '5', Value: '4', Label: 'ALL oral care is contraindicated.  (In this case, the answer in the Oral Care column for this patient should also be “C”.)' },
                    { DisplayOrder: '6', Value: '5', Label: 'Patient refusal' }
                ] 
            },
            { 
                DisplayOrder: 15, 
                Id: 14, 
                Label: 'SAT', 
                Type: 'string', 
                Interface: 'dropdown', 
                Options: [
                    { DisplayOrder: '1', Value: 'Y', Label: 'Yes', AccessKeys: ['0'] },
                    { DisplayOrder: '2', Value: 'N', Label: 'No', AccessKeys: ['1'] },
                    { DisplayOrder: '3', Value: 'C/NI', Label: 'Contraindicated / Not Indicated', AccessKeys: ['c', '2'] } //Test Case
                ] 
            },
            { 
                DisplayOrder: 16, 
                Id: 15, 
                Label: 'SAT Con', 
                Type: 'number', 
                Interface: 'dropdown', 
                Options: [
                    { DisplayOrder: '1', Value: '0', Label: 'Other' },
                    { DisplayOrder: '2', Value: '1', Label: 'Patient is receiving a sedative infusion for active seizures or alcohol withdrawal.' },
                    { DisplayOrder: '3', Value: '2', Label: 'Patient is receiving escalating sedative doses due to ongoing agitation.' },
                    { DisplayOrder: '4', Value: '3', Label: 'Patient is receiving neuromuscular blockers.' },
                    { DisplayOrder: '5', Value: '4', Label: 'Patient has had evidence of active myocardial ischemia in the previous 24 hrs.' },
                    { DisplayOrder: '6', Value: '5', Label: 'Patient has had evidence of increased intracranial pressure.' }
                ] 
            },
            { 
                DisplayOrder: 17, 
                Id: 16, 
                Label: 'SBT', 
                Type: 'string', 
                Interface: 'dropdown', 
                Options: [
                    { DisplayOrder: '1', Value: 'Y', Label: 'Yes', AccessKeys: ['0'] },
                    { DisplayOrder: '2', Value: 'N', Label: 'No', AccessKeys: ['1'] },
                    { DisplayOrder: '3', Value: 'C/NI', Label: 'Contraindicated / Not Indicated', AccessKeys: ['c', '2']} //Test Case
                ] 
            },
            { 
                DisplayOrder: 18,
                Id: 17, 
                Label: 'SBT Con', 
                Type: 'number', 
                Interface: 'dropdown', 
                Options: [
                    { DisplayOrder: '1', Value: '0', Label: 'Other' },
                    { DisplayOrder: '2', Value: '1', Label: 'Doesn’t have adequate oxygenation [SpO2 < 88% on an F1O2 of <= 50%and a PEEP of <=3 cm H2O' },
                    { DisplayOrder: '3', Value: '2', Label: 'No spontaneous inspiratory effort in a 5-min period.' },
                    { DisplayOrder: '4', Value: '3', Label: 'Acute agitation requiring escalating sedative doses.' },
                    { DisplayOrder: '5', Value: '4', Label: 'Significant use of vasopressors or inotropes.' },
                    { DisplayOrder: '6', Value: '5', Label: 'Evidence of increased intracranial pressure.' }
                ] 
            }
        ]
    }

    var recordTemplate = new RecordTemplate(recordTemplateAsJson);
   
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



        //RESET DRAFT
//        ko.utils.arrayForEach(self.Draft.Fields(), function (field) {
//            field.Value('');
//        });

        //PROCESS RECORD : TODO : Send  and accept the record data in right format
        self.RecordProcessor.processRecord(self.RecordCount())
        .done(function (result) {
            self.OutputConsole.append('<li>' + result + '</li>');
        })
        .fail(function (error) {
            self.ErrorConsole.html('Unexpected error while processing record.');
            self.ErrorConsole.fadeIn("slow");
        });
        self.Records.push(newRecord);
    }


}

function RecordTemplate(recordTemplateAsJSON) {

    var self = this;
    self.Fields = [];

    //Build View Model based on template

    for (var i = 0; i < recordTemplateAsJSON.Fields.length; i++) {

        var thisField = recordTemplateAsJSON.Fields[i];

        var fieldVM = new FieldVM(thisField.Label);
        for (var j = 0; j < thisField.Options.length; j++) {
            var thisOption = thisField.Options[j];
            fieldVM.Options.push(new OptionVM(thisOption.Value, thisOption.Label));
        }

        self.Fields.push(fieldVM);
    }
    
}

function RecordVM(recordTemplate, record) {

    var self = this;

    self.RecordTemplate = recordTemplate;
    self.Id = 0;
    self.Fields = [];
   
    //Build View Model based on template
    $.each(recordTemplate.Fields, function (i) {
        var thisField = this;
        var fieldVM = new FieldVM(thisField.Label);
        $.each(thisField.Options, function (j) {
            var thisOption = this;
            //fieldVM.Options.push(ko.mapping.fromJS(new OptionVM(thisOption.Value, thisOption.Label)));
            fieldVM.Options.push(new OptionVM(thisOption.Value, thisOption.Label));
        });

        //Setting the record as the parent
        fieldVM.Parent = self;

        //self.Fields.push(ko.mapping.fromJS(fieldVM));
        self.Fields.push(fieldVM);

    });

    self.CurrentField = self.Fields[3];

    self.Status = 'Draft'; //['Draft', 'Working', 'Dirty', 'Saving', 'Saved', 'Failed', 'ToBeDeleted']
    
}

function FieldVM(label) {

    var self = this;
    self.Parent = null;
    self.Id = 0;
    self.Label = label;
    self.Description = 'description for' + label;
    self.HelpContent = 'Help Content for ' + label;
    self.DisplayOrder = 0;

    self.HasFocus = ko.observable(false);
    
    self.Options = [];


    //self.Value = ko.observable('');

    self.Input = ko.observable('');
    self.Value = ko.computed({
        read: function () {
            return this.Input().toUpperCase();
        },
        write: function (value) {
            this.Input(value); 
        },
        owner : self
    });

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
