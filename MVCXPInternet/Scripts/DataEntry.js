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
                    { Value: '0', Label: 'Other'},
                    { Value: '1', Label: 'Tracheostomy'}
                ]
            },
            {
                DisplayOrder: 7,
                Id: 6,
                Label: 'Location of Intubation',
                Type: 'number', Interface: 'dropdown',
                Options: [
                    { Value: '0', ChoiceNum: '1', Label: 'Your ICU' },
                    { Value: '1', ChoiceNum: '1', Label: 'Another ICU in your hospital' },
                    { Value: '2', Label: 'Outside hospital' },
                    { Value: '3', Label: 'OR' },
                    { Value: '4', Label: 'Rapid Response Team (RRT)' },
                    { Value: '5', Label: 'ED' },
                    { Value: '6', Label: 'Cardiovascular and Interventional Laboratory (CVDL)' },
                    { Value: '7', Label: 'During a code on the floor' },
                    { Value: '8', Label: 'Another location not listed above' }
                ]
            },
            {
                DisplayOrder: 8,
                Id: 7,
                Label: 'Does Sub-G tube work?',
                Type: 'string',
                Interface: 'dropdown',
                Options: [
                    { Value: 'Y', Label: 'Yes', AccessKeys: ['0'] },
                    { Value: 'N', Label: 'No', AccessKeys: ['1'] },
                    { Value: 'N/A', Label: 'Not Applicable', AccessKeys: ['na', '/', '2']} //Test Case
                ]
            },
            {
                DisplayOrder: 9,
                Id: 8,
                Label: 'HOB @ ≥30o',
                Type: 'string',
                Interface: 'dropdown',
                Options: [
                    { Value: 'Y', Label: 'Yes', AccessKeys: ['0'] },
                    { Value: 'N', Label: 'No', AccessKeys: ['1'] },
                    { Value: 'C', Label: 'Contraindicated', AccessKeys: ['2'] }
                ]
            },
            {
                DisplayOrder: 10,
                Id: 9,
                Label: 'HOB Con',
                Type: 'number',
                Interface: 'dropdown',
                Options: [
                    { Value: '0', Label: 'Other' },
                    { Value: '1', Label: 'Hypotension' },
                    { Value: '2', Label: 'Unstable Physiological Status' },
                    { Value: '3', Label: 'Low Cardiac Index' },
                    { Value: '4', Label: 'Cervical, thoracic or lumbar surgery or instability' },
                    { Value: '5', Label: 'LVAD' },
                    { Value: '6', Label: 'RVAD' },
                    { Value: '7', Label: 'Intra aortic balloon pump' },
                    { Value: '8', Label: 'Open abdomen' },
                    { Value: '9', Label: 'Patient refusal' }
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
                    { Value: '0', Label: 'Other' },
                    { Value: '1', Label: 'Patient refusal' }
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
                    { Value: '0', Label: 'Other' },
                    { Value: '1', Label: 'Patient is known to have an allergic or hypersensitivity reaction to chlorhexidine' },
                    { Value: '2', Label: 'Patient is < 2 months of age' },
                    { Value: '3', Label: 'There is a possibility of direct contact of CHG with meninges' },
                    { Value: '4', Label: 'ALL oral care is contraindicated.  (In this case, the answer in the Oral Care column for this patient should also be “C”.)' },
                    { Value: '5', Label: 'Patient refusal' }
                ]
            },
            {
                DisplayOrder: 15,
                Id: 14,
                Label: 'SAT',
                Type: 'string',
                Interface: 'dropdown',
                Options: [
                    { Value: 'Y', Label: 'Yes', AccessKeys: ['0'] },
                    { Value: 'N', Label: 'No', AccessKeys: ['1'] },
                    { Value: 'C/NI', Label: 'Contraindicated / Not Indicated', AccessKeys: ['c', '2']} //Test Case
                ]
            },
            {
                DisplayOrder: 16,
                Id: 15,
                Label: 'SAT Con',
                Type: 'number',
                Interface: 'dropdown',
                Options: [
                    { Value: '0', Label: 'Other' },
                    { Value: '1', Label: 'Patient is receiving a sedative infusion for active seizures or alcohol withdrawal.' },
                    { Value: '2', Label: 'Patient is receiving escalating sedative doses due to ongoing agitation.' },
                    { Value: '3', Label: 'Patient is receiving neuromuscular blockers.' },
                    { Value: '4', Label: 'Patient has had evidence of active myocardial ischemia in the previous 24 hrs.' },
                    { Value: '5', Label: 'Patient has had evidence of increased intracranial pressure.' }
                ]
            },
            {
                DisplayOrder: 17,
                Id: 16,
                Label: 'SBT',
                Type: 'string',
                Interface: 'dropdown',
                Options: [
                    { Value: 'Y', Label: 'Yes', AccessKeys: ['0'] },
                    { Value: 'N', Label: 'No', AccessKeys: ['1'] },
                    { Value: 'C/NI', Label: 'Contraindicated / Not Indicated', AccessKeys: ['c', '2']} //Test Case
                ]
            },
            {
                DisplayOrder: 18,
                Id: 17,
                Label: 'SBT Con',
                Type: 'number',
                Interface: 'dropdown',
                Options: [
                    { Value: '0', Label: 'Other' },
                    { Value: '1', Label: 'Doesn’t have adequate oxygenation [SpO2 < 88% on an F1O2 of <= 50%and a PEEP of <=3 cm H2O' },
                    { Value: '2', Label: 'No spontaneous inspiratory effort in a 5-min period.' },
                    { Value: '3', Label: 'Acute agitation requiring escalating sedative doses.' },
                    { Value: '4', Label: 'Significant use of vasopressors or inotropes.' },
                    { Value: '5', Label: 'Evidence of increased intracranial pressure.' }
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

    $(document).keyup(function (e) {
        var key = 0;
        if (e == null) {
            key = event.keyCode;
        } else { // mozilla
            key = e.which;
        }

        switch (key) {
            case 13: //Enter
                app.SubmitDraft();
                break;
            case 27: //Escape
                var currentField = app.Draft.FieldInFocus();
                if (currentField != null) {
                    currentField.Input('');
                }
                break;
            case 32: //Space
                break;
            case 37: //Left
                var currentField = app.Draft.FieldInFocus();
                if (currentField == null) break;
                if (currentField.Interface == 'dropdown') {
                    currentField.SelectPreviousOption();
                }
                break;
            case 39: //Right
                var currentField = app.Draft.FieldInFocus();
                if (currentField == null) break;
                if (currentField.Interface == 'dropdown') {
                    currentField.SelectNextOption();
                }
                break;
            case 38: //Up
                var currentField = app.Draft.FieldInFocus();
                if (currentField == null) break;
                if (currentField.Interface == 'dropdown') {
                    if (currentField.SelectedIndex() != -1) currentField.SelectPreviousOption();
                    currentField.SelectPreviousOption();
                }
                break;
            case 40: //Down
                var currentField = app.Draft.FieldInFocus();
                if (currentField == null) break;
                if (currentField.Interface == 'dropdown') {
                    if (currentField.SelectedIndex() != -1) currentField.SelectNextOption();
                    currentField.SelectNextOption();
                }
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
        ko.utils.arrayForEach(self.Draft.Fields(), function (field) {
            field.Input('');
            if (field.DisplayOrder() == 1) field.HasFocus(true);
        });



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
        fieldVM.DisplayOrder = thisField.DisplayOrder;
        fieldVM.Type = thisField.Type;
        fieldVM.Interface = thisField.Interface;
        if (thisField.Required) fieldVM.Required = thisField.Required;

        for (var j = 0; j < thisField.Options.length; j++) {

            var thisOption = thisField.Options[j];

            var optionVM = new OptionVM(thisOption.Value, thisOption.Label);
            if (thisOption.AccessKeys) optionVM.AccessKeys = thisOption.AccessKeys;

            fieldVM.Options.push(optionVM);

        }

        self.Fields.push(fieldVM);
    }

}

function RecordVM(recordTemplate, record) {

    var self = this;

    self.RecordTemplate = recordTemplate;
    self.Id = 0;
    self.Fields = [];


//    this.GetFieldInFocus = function () {
//        var fieldInFocus = ko.utils.arrayFirst(self.Fields, function (field) {
//            return field.HasFocus() === true;
//        });

//        
//        return fieldInFocus;
//    }


    self.FieldInFocus = ko.computed({
        read: function () {
            return ko.utils.arrayFirst(self.Fields, function (field) {
                return field.HasFocus() === true;
            });
        },
        owner: self,
        deferEvaluation: true
    });

    //TODO :Consider using extensions
    //TODO :See how we can reuse mapping code from above

    //Build View Model based on template
    for (var i = 0; i < recordTemplate.Fields.length; i++) {

        var thisField = recordTemplate.Fields[i];


        var fieldVM = new FieldVM(thisField.Label);
        fieldVM.DisplayOrder = thisField.DisplayOrder;
        fieldVM.Type = thisField.Type;
        fieldVM.Interface = thisField.Interface;
        if (thisField.Required) fieldVM.Required = thisField.Required;

        for (var j = 0; j < thisField.Options.length; j++) {

            var thisOption = thisField.Options[j];

            var optionVM = new OptionVM(thisOption.Value, thisOption.Label);
            if (thisOption.AccessKeys) optionVM.AccessKeys = thisOption.AccessKeys;

            fieldVM.Options.push(optionVM);
        }

        self.Fields.push(fieldVM);

    }



    self.Status = 'Draft'; //['Draft', 'Working', 'Dirty', 'Saving', 'Saved', 'Failed', 'ToBeDeleted']

}

function FieldVM(label) {

    var self = this;
    self.Parent = null;
    self.Id = 0;
    self.Required = false;
    self.Type = 'string';
    self.Interface = 'textbox';
    self.DisplayOrder = 0;
    self.Label = label;


    self.Description = 'description for' + label;
    self.HelpContent = 'Help Content for ' + label;


    self.HasFocus = ko.observable(false);

    self.Options = [];


    //self.Value = ko.observable('');


    self.IsInputValid = ko.observable(true);


    self.Input = ko.observable('');
    self.EffectiveValue = ko.computed({
        read: function () {

            var input = this.Input();

            if (input.length == 0) return input;


            if (self.Interface == 'dropdown') {

                for (var o = 0; o < this.Options.length; o++) {

                    var thisOption = this.Options[o];

                    if (
                        (thisOption.Value.toLowerCase().indexOf(input.toLowerCase()) == 0)
                            | (thisOption.Label.toLowerCase().indexOf(input.toLowerCase()) == 0)
                            | (thisOption.Value.toLowerCase() == input.toLowerCase())
                            | (thisOption.Label.toLowerCase() == input.toLowerCase())
                        ) {
                        return thisOption.Value;
                    }

                    for (var k = 0; k < thisOption.AccessKeys.length; k++) {
                        if (thisOption.AccessKeys[k].toLowerCase() == input.toLowerCase()) {
                            return thisOption.Value;
                        }
                    }

                    //Cant use this as an input of N/A will match with Option N
//                    if (input.toLowerCase().indexOf(thisOption.Value.toLowerCase()) == 0) 
//                    {
//                        return thisOption.Value;
//                    }
                }
            }

            if (self.Interface == 'textbox') {
                if (self.Type == 'number') {
                    //TODO: Validate for range, digits, precision  
                }

                if (self.Type == 'string') {
                    //TODO: Validate for max length
                }

                return self.Input();
            }

            if (self.Interface == 'datepicker') {
                return self.Input();
            }
            return '';


        },
        write: function (value) {
            this.Input(value);
        },
        owner: self
    });

    self.EffectiveValue.subscribe(function (newValue) {
       
        if (self.Options.length == 0) return;

        $.each(self.Options, function () {
            this.Selected(false);
            if (this.Value.toLowerCase() == newValue.toLowerCase()) this.Selected(true);
        });

    });

    self.AutoAdjust = function () {
        this.Input(this.EffectiveValue()); 
    }
    
    self.SelectedIndex = ko.computed({
        read: function () {
            for (var i = 0; i < self.Options.length; i++) {
                if (self.Options[i].Selected() == true) {
                    return i;
                }
            }
            return -1;
        },
        deferEvaluation: true
    });

    //For Keyboard Support
    self.SelectNextOption = function () {
        var currentSelection = self.SelectedIndex();
        if (currentSelection == -1) {
            this.Input(this.Options[0].Value);
        } else {
            this.Input(this.Options[(currentSelection + 2 > this.Options.length) ? 0 : currentSelection + 1].Value);
        }
    }
    
    self.SelectPreviousOption = function () {
        var currentSelection = self.SelectedIndex();
        if (currentSelection == -1) {
            //this.Input(this.Options[this.Options.length - 1].Value);
            this.Input(this.Options[0].Value);
        } else {
            this.Input(this.Options[(currentSelection < 1) ? this.Options.length - 1 : currentSelection - 1].Value);
        }
    }

}


function OptionVM(value, label) {

    var self = this;

    self.Value = value;
    self.Label = label;

    self.AccessKeys = [];
    self.Selected = ko.observable(false);

}
