({
	doInit : function(component, event, helper) {
		console.log('calling doInit');
	},
   
    createOpp : function(component, event, helper){
        console.log('Create record');
        
        //getting the candidate information
        var oppJ = component.get("v.oppV");
        
       //Calling the Apex Function
        var action = component.get("c.createRecord");
        
        //Setting the Apex Parameter
        action.setParams({
            oppC : oppJ
        });
        
        //Setting the Callback
        action.setCallback(this,function(response1){
            //get the response state
            var state = response1.getState();
            var resObj= response1.getReturnValue();
            console.log('--response1--->>'+response1.getReturnValue());
            //check if result is successfull
            if(state == "SUCCESS"){
                
                alert('Record is Created Successfully');
				if(sforce.console.isInConsole()){
                console.log('--console block--');
                var myEvent = $A.get("e.c:RefreshVFPageEvent");
                myEvent.setParams({"data": resObj});
                myEvent.fire();
        
                 
                    //window.close();
                }
                
               /* if(sforce.console.isInConsole()){
                console.log('--console block--');
                var tabLink = '/'+resObj;
                 window.open(tabLink , '_self'); 
                 }
*/
                 
                
            } else if(state == "ERROR"){
                alert('Error in calling server side action');
            }
        });
        
		//adds the server-side action to the queue        
        $A.enqueueAction(action);   
    },
           
        
     navigateToNewOpp : function (component, event, helper, newOppId) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": newOppId,
            "slideDevName": "detail"
        });
        navEvt.fire();
    },
})