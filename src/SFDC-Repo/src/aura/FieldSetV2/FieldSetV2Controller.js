({
    init: function(cmp, event, helper) {
        console.log('FieldSetFormController.init');
        
        var fieldSetName = cmp.get('v.fieldSetName');
        var sobjectName = 'Account'; //cmp.get('v.sObjectName');
        var recordId = '0017F000009g43c';//cmp.get('v.recordId');
        
        if (!fieldSetName) {
        	console.log('The field set is required.');
        	return;
        }
        
        var getFormAction = cmp.get('c.getForm');

        getFormAction.setParams({
            fieldSetName: fieldSetName,
            objectName: sobjectName,
            recordId: recordId
        });

        getFormAction.setCallback(this, 
            function(response) {
            	var state = response.getState();
            	console.log('FieldSetFormController getFormAction callback');
            	console.log("callback state: " + state);
            
            	if (cmp.isValid() && state === "SUCCESS") {
	                var form = response.getReturnValue();
	                cmp.set('v.fields', form.Fields);
                }
            }
        );
        $A.enqueueAction(getFormAction);
    }
})