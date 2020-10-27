({
	searchKeyChangeC : function(component, event, helper) {
        console.log('---searchbar ctrl--');
        var myEvent= $A.get("e.c:SearchKeyChange"); // Event name
        myEvent.setParams({"searchKeyy":event.target.value});
        console.log('---searchbar ctrl--event.target.value---'+event.target.value);
        myEvent.fire();
        /*Code Highlights:

        The function first gets an instance of the SearchKeyChange event
        It then sets the event's searchKey parameter to the input field's new value
        Finally, it fires the event so that registered listeners can catch it */
		
	}
})