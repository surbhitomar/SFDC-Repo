({
	/*
     * For showing the error message
    */
	showErrorMessage : function(component, event, helper, msg){
        helper.toggleSpinner(component, event, helper, 'slds-hide');
        component.set("v.varErrMsg", msg);
    },
    toggleSpinner : function(component, event, helper, prop) {
        component.set('v.varSpinnerCls', prop);
    },
    //------------------ Check Start --------------------------------
    addCheckRecord: function(component, event) {
        //get the check List from component  
        var checkList = component.get("v.varCheckList");
        //Add New Check Record
        checkList.push({
            'sobjectType': 'Checks__c',
            'Check_Issue_Date__c': '',
            'Check_Amount__c': '',
            'Check_Number__c': '',
            'Check_Delay_Reason__c': '',
            'Check_Notes__c': ''
        });
        component.set("v.varCheckList", checkList);
    },
     
    validateCheckList: function(component, event) {
        //Validate all account records
        var isValid = true;
        var checkList = component.get("v.varCheckList");
        /*
        for (var i = 0; i < checkList.length; i++) {
            if (checkList[i].Name == '') {
                isValid = false;
                alert('Check Name cannot be blank on row number ' + (i + 1));
            }
        }*/
        return isValid;
    },
    //-------------------------- Check End -----------------------
})