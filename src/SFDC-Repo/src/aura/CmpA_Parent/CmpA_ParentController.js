({
	doInit: function(component, event, helper) {
		console.log('Parent doInit');
	},
    //Passing parent variables to child component
    onCallChildMethod : function(component, event, helper) {
        var attribute1 = component.get('v.parentAttribute1');
        var attribute2 = component.get('v.parentAttribute2');
        var childComponent = component.find('child');
        childComponent.myMethodToGetVariables(attribute1, attribute2);
    },
    updateParentAttr: function(cmp) {
        cmp.set("v.parentAttrUn", "Updated parent attribute");
    },
    /*handleEvent: function(component, event, helper) {
    // refresh Component A here
    var message = event.getParam("message");
    alert(message);
	},*/
    
    //Calling child component method from parent component
     callChild : function(component, event, helper) {
        console.log('callChild- in parent');
        var childComp = component.find('childComp');
        childComp.callChildFunc();
    }
})