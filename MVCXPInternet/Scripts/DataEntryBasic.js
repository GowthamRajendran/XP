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
    
    $("#Submit").click(function () {
    });
    
    var appSettings = {AppContainerId: 'formContainer'};
    var app = new DataEntryForm(appSettings).Render();
    
});


function DataEntryForm(Settings) {

    var self = this;

    self.Settings = Settings;
    self.RecordCount = ko.observable(0);
    self.RecordProcessor = null;
    self.ConnectionId = null;
    self.OutputConsole = $("#messages");

    self.Records1 = [];
    self.Records = ko.observableArray([]);
    self.Draft = ko.mapping.fromJS(new RecordVM());

    self.Render = function () {
        self.Init();
    }

    self.Init = function () {
        self.RecordProcessor = $.connection.dataEntryHub;
        self.ConnectionId = $.connection.dataEntryHub.id;

        $.extend(self.RecordProcessor, {
            recordProcessing: self.RecordProcessing,
            recordProcessingComplete: self.RecordProcessingComplete,
            recordProcessingFailed: self.RecordProcessingFailed
        });


        $.connection.hub.start().done(function () { $('#messages').append('<li>' + 'Connected to server' + '</li>'); });

        ko.applyBindings(self);
    }


    self.RecordProcessing = function (recordId, percentComplete) {
        //self.OutputConsole.append('<li>' + recordId + '( ' + percentComplete + ' complete. ) ' + '</li>');
        var record = self.GetRecord(recordId);
        record.Status(percentComplete + '% complete');
    }

    self.RecordProcessingComplete = function (recordId, percentComplete) {
        //self.OutputConsole.append('<li>' + recordId + '( Completed! ) ' + '</li>');
        var record = self.GetRecord(recordId);
        record.Status('Saved');
    }

    self.RecordProcessingFailed = function (recordId, percentComplete) {
        self.OutputConsole.append('<li>' + recordId + '( Failed ) ' + '</li>');
    }
    
    self.GetRecord = function (id) {
        return record = ko.utils.arrayFirst(self.Records(), function (record) {
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

        //$('#messages').append('<li>' + 'Submitting...' + self.RecordCount() + '</li>');
        self.RecordProcessor.processRecord('record data', self.RecordCount());

    }

    $('#messages').append('<li>' + 'Set up ' + '</li>');
}



function RecordVM() {

    var self = this;
    self.Id = 0;
    self.FirstName = 'fn';
    self.LastName = 'ln';
    self.Age = 0;

    self.Status = ko.observable('Draft'); //['Draft', 'Working', 'Dirty', 'Saving', 'Saved', 'Failed', 'ToBeDeleted']

}


