({
	fireMyComponentEvent : function(component, event, helper) {
        var myEvent = component.getEvent("myComponentEvent");
        myEvent.setParams({"param": "It works!"});
        myEvent.fire();
	}
})