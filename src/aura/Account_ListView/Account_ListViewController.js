({
	doinit : function(component, event, helper) {
        console.log('--init--');
        var action= component.get("c.fetchAccountRecord");
        action.setCallback(this,function(res){
         component.set("v.accountWrapperListV", res.getReturnValue());
        });
        $A.enqueueAction(action);
		
	},
    showSeletedRecords : function(component, event, helper){
        console.log('--showSeletedRecords calling--');
		var accountList= component.get("v.accountWrapperListV");
        for(var i=0;i<accountList.length;i++){
            if(accountList[i].isSelect){
                component.set("v.accountWrapperListV".accountList[i].acc);
                console.log(accountList[i].acc);
            }
        }
		        
    }, 
})