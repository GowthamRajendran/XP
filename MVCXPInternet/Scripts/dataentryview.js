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
                    { Value: '0', Label: 'Other' },
                    { Value: '1', Label: 'Tracheostomy' }
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

    $("#saveButton").click(function () {
        app.SubmitDraft();
    });


    $(document).keyup(function (e) {
        var key = 0;
        if (e == null) {
            key = event.keyCode;
        } else { // mozilla
            key = e.which;
        }

        switch (key) {
            case 13: //Enter
                //app.SubmitDraft();
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

