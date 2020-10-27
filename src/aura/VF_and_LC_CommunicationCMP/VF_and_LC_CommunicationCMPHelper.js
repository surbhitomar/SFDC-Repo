({
    sendHelper: function (component)
    {         
        component.set("v.spinner", true);
        // call the server side controller method 	
        var action = component.get("c.sendMailMethod");
        // set the params to sendMailMethod method   
        action.setParams({
            'mSubjectC': component.get("v.subject"),
            'mbodyC': component.get("v.body"),
            'caseIdC': component.get("v.recordIdVar"),
            'accSObject': component.get("v.selectedRecordToVar"),
            'templateIdC': component.get("v.templateId"),
            'selectedRecordAdditionalTols': component.get("v.selectedRecordAdditionalToVar"),
            'selectedRecordCCls': component.get("v.selectedRecordCCVar"),
            'selectedRecordBCCls': component.get("v.selectedRecordBCCVar")
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
             console.log('--helper state--'+state);
        
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                // if state of server response is comes "SUCCESS",
                // display the success message box by set mailStatus attribute to true            }
               component.set("v.spinner", false);
               component.set("v.mailStatus", true);
            }
        });        
        $A.enqueueAction(action);          
    },
    onloadDisplayEmailTemplate : function (component,emailTempIdJ) {
        if (emailTempIdJ != null && emailTempIdJ != '' && emailTempIdJ != 'undefined') {
            var actionGetEmailTemplateInfo = component.get("c.getEmailTemplate");
        	actionGetEmailTemplateInfo.setParams({
            "templateIdC": emailTempIdJ,
            "recordIdC": component.get("v.recordIdVar")
        });  
        actionGetEmailTemplateInfo.setCallback(this, function (response) {
            var state = response.getState();
            console.log('@@@@state' + state);
            if (state === "SUCCESS") {
                
                if (response.getReturnValue() != null && response.getReturnValue() != "" && response.getReturnValue() != undefined) {
                   console.log(response.getReturnValue());
                    component.set("v.emailWrapperVar", response.getReturnValue()); 
                }
            }
        });
        $A.enqueueAction(actionGetEmailTemplateInfo);          
        }               
 },
    fireEventToCallVf: function(component, event) {
        console.log('fireEvent in Helper');
        var myEvent = $A.get("e.c:lightningAppExternalEvent");
        myEvent.setParams({"data":"Coming From LC Yahoo"});
        myEvent.fire();
    }

})