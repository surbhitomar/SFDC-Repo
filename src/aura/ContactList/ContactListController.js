({
     doInit : function(component, event) {
        var action = component.get("c.findAll");
        console.log('--calling--');
        action.setCallback(this, function(a) {
            component.set("v.contacts", a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    
    searchKeyChangeA : function(component, event) {
    console.log('--contactlist ctrl---');
    var searchKey1 = event.getParam("searchKeyy");
    console.log('--contactlist ctrl--searchKey1-'+searchKey1);
    var action = component.get("c.findByName");
    action.setParams({
      "searchKeyApexText": searchKey1
    });
       
    action.setCallback(this, function(a) {
        component.set("v.contacts", a.getReturnValue());
    });
    $A.enqueueAction(action);
 }
})