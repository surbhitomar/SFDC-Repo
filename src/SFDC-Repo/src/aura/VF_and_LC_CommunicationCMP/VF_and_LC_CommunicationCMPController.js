({
    doInit: function (component, event, helper) {
        component.set("v.spinner", true);
        var recordIdJ = component.get("v.recordIdVar");
        var toAddressJ = component.get("v.toAddress");
        var objectName = component.get("v.objectName");
        var emailTempIdJ = component.get("v.templateId");
        console.log('emailTempIdJ--'+emailTempIdJ);
        var action = component.get("c.getToAddress");
       
        action.setParams({
            "toAddressC" : component.get("v.recordIdVar")
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if (response.getReturnValue() != null && response.getReturnValue() != "" && response.getReturnValue() != undefined) {
                    component.set("v.selectedRecordToVar", response.getReturnValue());
                    component.set("v.parentInitialized",true);
                    component.set("v.spinner", false);
                }
            }
        });
        helper.onloadDisplayEmailTemplate(component,emailTempIdJ);
        $A.enqueueAction(action);
        
    },
    // when user click on Send button
    sendMail: function (component, event, helper) {       
        helper.sendHelper(component);
    },
    // when user click on the close buttton on message popup ,
    // hide the Message box by set the mailStatus attribute to false
    // and clear all values of input fields.   
    closeMessage: function (component, event, helper) {
        console.log('--closeMessage--');
        helper.fireEventToCallVf(component, event);
    },
     handleComponentEvent : function(component, event, helper) {
    // get the selected Account record from the COMPONENT event     
       var selectedAccountGetFromEvent = event.getParam("recordByEvent");
       component.set("v.selectedRecordToVar" , selectedAccountGetFromEvent);
         console.log('@@selectedAccountGetFromEvent ' + JSON.stringify(selectedAccountGetFromEvent));
     },
    handleMultiSelectCompEvent : function(component, event, helper) {
    // get the selected Account record from the COMPONENT event  
      console.log('--handleMultiSelectCompEvent--');   
      var selectedUserGetFromEvent = event.getParam("recordByEvent");
      //component.set("v.selectedRecordCCJ" , selectedUserGetFromEvent);
      console.log('@@selectedUserGetFromEvent ' + JSON.stringify(selectedUserGetFromEvent));
     },   
    
 })