({
	loadContacts : function(cmp) {
        var action= cmp.get("c.findAll");
        action.setCallback(this, function(response){
            var state= response.getState();
            console.log('--state-->>'+state);
            if(state === "SUCCESS"){
                cmp.set("v.contacts", response.getReturnValue());
                cmp.set("v.contactList", response.getReturnValue());
                this.uploadTotal(cmp);
            }
            // Display toast message to indicate load status
            var toastEvent= $A.get("e.force:showToast");
            if(state === 'SUCCESS'){
                toastEvent.setParams({
                    "title" : "Success!",
                    "message": " Your contacts have been loaded successfully."
                });
            }else{
                toastEvent.setParams({
                    "title" : "Error!",
                    "message": " Something has gone wrong."
                });
                
            }
 
            toastEvent.fire();            
        });
		$A.enqueueAction(action);
	},
    
    uploadTotal : function(cmp){
        var contacts = cmp.get("v.contacts");
        cmp.set("v.totalContacts", contacts.length);

    }
    
})