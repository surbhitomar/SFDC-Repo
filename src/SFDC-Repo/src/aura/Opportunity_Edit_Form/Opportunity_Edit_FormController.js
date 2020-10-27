({
	init: function(cmp, event, helper) {
        
        console.log('FieldSetFormController.init');
        var sectionfieldSetName = cmp.get('v.sectionfieldSetName');
        var sobjectName = cmp.get('v.sObjectName');
        var recordId = cmp.get('v.recordId');
        
        var getFormAction = cmp.get('c.getForm');

        getFormAction.setParams({
            "fieldSetName": sectionfieldSetName,
            "objectName": sobjectName,
            "recordId": recordId
        });

        getFormAction.setCallback(this, function(response) {
            	var state = response.getState();
            	console.log('FieldSetFormController getFormAction callback');
            	console.log("callback state: " + state);
            
            	if (cmp.isValid() && state === "SUCCESS") {
	                var form = response.getReturnValue();
                    console.log("form: " , form);
	                cmp.set('v.sectionFields', form.fields);
                    cmp.set('v.relatedProducts', form.products);
                }
                cmp.set("v.showSpinner", false);
            }
        );
        $A.enqueueAction(getFormAction);
    }
})