/// <reference path="jquery-1.8.0.js" />
/// <reference path="jquery-ui-1.8.20.js" />
/// <reference path="jquery.signalR-0.5.3.js" />
/// <reference path="knockout-2.1.0.js" />

/// <reference path="knockout.mapping-latest.js" />
/// <reference path="jquery.linq-vsdoc.js" />
/// <reference path="linq-vsdoc.js" />
/// <reference path="linq.js" />
/// <reference path="jquery.linq.js" />

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
        if (self.Draft.IsInvalid()) {
            alert('Invalid values found');
            return;
        }
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



        //Build payload and reset draft
        var payload = [];
        ko.utils.arrayForEach(self.Draft.Fields(), function (field) {
            payload.push({DataFieldId: field.DataFieldId(), Response: field.Input()});
            field.Input('');
            if (field.DisplayOrder() == 1) field.HasFocus(true);
        });



        //PROCESS RECORD : TODO : Send  and accept the record data in right format
        self.RecordProcessor.processRecord(self.RecordCount(), payload)
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
        fieldVM.DataFieldId = thisField.DataFieldId;
        fieldVM.DisplayOrder = thisField.DisplayOrder;
        fieldVM.Type = thisField.Type;
        fieldVM.Interface = thisField.Interface;
        if (thisField.Required) fieldVM.Required = thisField.Required;

        //Prepend an empty option
        if (thisField.Interface == 'dropdown') fieldVM.Options.push(new OptionVM('', ''));

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

    self.IsInvalid = ko.computed({
        read: function () {
            var IsInValid = false;
            ko.utils.arrayForEach(self.Fields, function (field) {
                if (field.IsInputInvalid()) IsInValid = true;
            });
            return IsInValid;
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
        fieldVM.DataFieldId = thisField.DataFieldId;
        fieldVM.DisplayOrder = thisField.DisplayOrder;
        fieldVM.Type = thisField.Type;
        fieldVM.Interface = thisField.Interface;
        if (thisField.Required) fieldVM.Required = thisField.Required;

        //Prepend an empty option
        if (thisField.Interface == 'dropdown') fieldVM.Options.push(new OptionVM('', ''));
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
    self.DataFieldId = 0;
    self.Required = false;
    self.Type = 'string';
    self.Interface = 'textbox';
    self.DisplayOrder = 0;
    self.Label = label;
    self.MinValue = 0;
    self.MaxValue = 9;

    self.Description = 'description for' + label;
    self.HelpContent = 'Help Content for ' + label;


    self.HasFocus = ko.observable(false);

    self.Options = [];


    //self.Value = ko.observable('');


    self.IsInputInvalid = ko.observable(true);
    self.WhyInvalid = ko.observable('');


    self.Input = ko.observable('');
    self.EffectiveValue = ko.computed({
        read: function () {
            
            var input = self.Input();

            self.IsInputInvalid(false);
            self.WhyInvalid('');

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
                    //if (input.toLowerCase().indexOf(thisOption.Value.toLowerCase()) == 0) 
                    //{
                    //      return thisOption.Value;
                    //}


                }

                self.IsInputInvalid(true);
                self.WhyInvalid('Input value cannot be resolved');
                return input;
            }

            if (self.Interface == 'textbox') {
                if (self.Type == 'number') {
                    if (isNaN(input)) {
                        self.IsInputInvalid(true);
                        self.WhyInvalid('A number is expected here');
                    } else if (parseFloat(input) > this.MaxValue) {
                        self.IsInputInvalid(true);
                        self.WhyInvalid('Value needs to be less than ' + this.MaxValue);
                    } else if (parseFloat(input) < this.MinValue) {
                        self.IsInputInvalid(true);
                        self.WhyInvalid('Value needs to be greater than ' + this.MinValue);
                    }
                } else if (self.Type == 'string') {
                    //TODO: Validate for max length. As of now none of our fields are strings. 
                }

            }

            if (self.Interface == 'datepicker') {
                
            }



            return input;


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
