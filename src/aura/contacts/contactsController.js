({
goToRecord : function(component, event, helper) {
    var cnId= component.get("v.contact.Id");
    console.log('--got to-ID-'+cnId);
    // Fire the event to navigate to the contact record
     var sObjectEvent = $A.get("e.force:navigateToSObject"); 
     sObjectEvent.setParams({ 
         "recordId": component.get("v.contact.Id") 
     }) 
     sObjectEvent.fire();
  }
})