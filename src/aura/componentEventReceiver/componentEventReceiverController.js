({
    handleMyComponentEvent : function(component, event, helper) {
        var value = event.getParam("param");
        alert("Received component event with param = "+ value);
    }
})