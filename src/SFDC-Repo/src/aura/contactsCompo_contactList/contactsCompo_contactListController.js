({
    doInit : function(component, event, helper) {
       // Retrieve contacts during component initialization
       helper.loadContacts(component);
		
	},
   
    handleSelect : function(component, event, helper){
        var contact= component.get("v.contacts");
        var contactList= component.get("v.contactList");
        
        //Get the selected option: "Referral", "Social Media", or "All" 
        var selected= event.getSource().get("v.value");
        console.log('--selected-->>'+selected);
        var filter= [];
        var k= 0;
        for(var i=0; i < contactList.length;i++){
            var c= contactList[i];
            if(selected != 'All'){
                if(c.LeadSource == selected){
                    filter[k]= c;
                    k++;
                }
            }else{
                 filter= contactList;
            }
        }
        console.log('--filter-->>'+filter);
        //Set the filtered list of contacts based on the selected option
        component.set("v.contacts",filter);
        helper.uploadTotal(component);
    }
    
})