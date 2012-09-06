/// <reference path="jquery-1.8.0.js" />
/// <reference path="jquery-ui-1.8.20.js" />
/// <reference path="jquery.signalR-0.5.3.js" />

var app;
var recordCount = 0;

$(document).ready(function () {


    var $outputConsole = $("#messages");
    var proxy = $.connection.dataEntryHub;
    var cid = $.connection.dataEntryHub.id;

    $.extend(proxy, {
        recordProcessing: function (recordId, percentComplete) {
            $outputConsole.append('<li>' + recordId + '( ' + percentComplete + ' complete. ) ' + '</li>');
        },
        recordProcessingComplete: function (recordId) {
            $outputConsole.append('<li>' + recordId + '( Completed! ) ' + '</li>');
        },
        recordProcessingFailed: function (recordId, error) {
            $outputConsole.append('<li>' + recordId + '( Failed ) ' + '</li>');
        }
    });


    $.connection.hub.start().done(function () { $('#messages').append('<li>' + 'connecting...' + '</li>'); });

    $("#Submit").click(function () {
        recordCount = recordCount + 1;
        proxy.processRecord('record data', recordCount);
    });


    var fields = [
                    { name: 'First Name', type: 'text', options: null },
                    { name: 'Last Name', type: 'text', options: null },
                    { name: 'DOB', type: 'date', options: null },
                    { name: 'IsOutPatient', type: 'boolean', options: [{ name: 'Yes', value: 1 }, { name: 'No', value: 0}] },
                    { name: 'Street', type: 'text', options: null },
                    { name: 'City', type: 'text', options: null },
                    { name: 'Country', type: 'integer', options: [{ name: 'USA', value: 1 }, { name: 'UK', value: 2 }, { name: 'Australia', value: 3}] }

                ];

    var appSettings = {
        AppContainerId: 'formContainer'
    };
    

    app = new DataEntryForm(fields, appSettings).Render();
    app.Form = ko.mapping.fromJS(app.Form);
    ko.applyBindings(app.Form);



});


function DataEntryForm(Fields, Settings) {

    var self = this;

    this.FormTitle = 'some title';
    this.Settings = Settings;
    this.Fields = Fields;
    this.Form = null;
    this.Render = function () {
        self.Init();
    }

    this.Init = function () {

        var recordTemplate = new RecordTemplateVM();
        for (var i = 0; i < self.Fields.length; i++) {
            var field = self.Fields[i];
            recordTemplate.Fields.push(new FieldVM(field.name, field.type, field.options));
        }

        this.Form = new FormVM(recordTemplate);
        this.Form.Draft = new RecordVM(recordTemplate);
        

    }


}


function FormVM(recordTemplate) {

    var self = this;

    self.RecordTemplate = recordTemplate;
    self.Records = [];
    self.Draft = new RecordVM(recordTemplate);
    self.Working = null;

    self.AddNewRecord = function () {
        var newRecord = new RecordVM(recordTemplate);
        return self.Records.push(newRecord);
    }
    self.Submit = function () {

    };
}

function RecordTemplateVM() {

    var self = this;

    self.Fields = [];

}

function RecordVM(recordTemplate) {

    var self = this;

    self.Fields = recordTemplate.Fields;

    self.Submit = function () {

        console.log('Submitting Draft : ' + JSON.stringify(self));
        /*
        $.ajax({
        type: "POST",
        url: "/handler1.ashx",
        data: self,
        dataType: "json",
        success: function (response) {
        // self.Status = 'Submitted';
        console.log('response to call : ' + JSON.stringify(response));
        }
        });
        */

    }

    self.Status = 'Draft'; //['Draft', 'Working', 'Dirty', 'Submitted', 'Processed', 'Failed', 'ToBeDeleted']

}

function FieldVM(name, type, options) {

    var self = this;

    self.Name = name;
    self.Type = type;
    self.Value = null;
    self.Options = options;

}

