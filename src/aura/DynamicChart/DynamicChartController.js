({
    doinit : function(component,event,helper){
        var sobje = component.get("v.sObj");
        var field = component.get("v.field");
        console.log('-JS-sobje-->>>'+sobje);
        console.log('-JS-field-->>>'+field);
        var action = component.get("c.retrivepicklistvalues");
        action.setParams({
        	selectedObject : sobje,
            selectedfield : field
    	});
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.picklistvalues",response.getReturnValue());
                console.log('picklistvalues in JS-->'+response.getReturnValue());
                helper.displaydata(component,event,helper);
            }
        });
        $A.enqueueAction(action);
    }
})