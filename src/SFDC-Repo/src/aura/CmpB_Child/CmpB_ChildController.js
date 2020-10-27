({
	doInit: function(component, event, helper) {
		console.log('Child doInit');
	},
    
    onChildAttributeChange : function (component, event, helper) {
        
        console.log("Child Attr Old value: " + event.getParam("oldValue"));
        console.log("Child Attr Current value: " + event.getParam("value"));
    },
    executeMyMethod : function (component, event, helper) {
        var params = event.getParam('arguments');
        console.log('In Child Param 1: '+ params.param1);
        console.log('In Child Param 2: '+ params.param2);
    },
    updateChildAttr: function(cmp) {
        cmp.set("v.childAttrUn", "updated child attribute");
    },
    //This Child method called from parent component
    callChildMethod : function(component, event, helper) {
        alert("This Child method called from parent component");
    }

})