({

	doInit : function(component, event, helper) {
		console.log('--doInit--');
		
        component.set("v.varErrorMsg",'');
        
        var action0 = component.get("c.initData");
        action0.setCallback(this, function(result) {
        	 component.set("v.varEBWrapper", result);    
        });
        $A.enqueueAction(action0);
        
        try{
        var action = component.get("c.getPicklistValues");
        action.setParams({ objectName : 'eBlotter__c',
                           fieldName : 'Sponsor_Custodian__c' });

        var opts=[];
        action.setCallback(this, function(a) {
            
        //console.log('--result--'+a.getReturnValue());
		if(a != undefined && a != 'undefined' )
        {
         for(var i=0;i< a.getReturnValue().length;i++){
              opts.push({"class": "optionClass", label: a.getReturnValue()[i], value: a.getReturnValue()[i]});
          }
         component.set("v.varSponsor_CustodianList", opts);
        }   
        });
        $A.enqueueAction(action);
            
        var action2 = component.get("c.getPicklistValues");
        action2.setParams({ objectName : 'eBlotter__c',
                           fieldName : 'Source_of_Funds__c' });
     
        var opts2=[];
        action2.setCallback(this, function(a2) {

         for(var i=0;i< a2.getReturnValue().length;i++){
              opts2.push({"class": "optionClass", label: a2.getReturnValue()[i], value: a2.getReturnValue()[i]});
          }
         component.set("v.varSourceOfFundsList", opts2);
             
        });
        $A.enqueueAction(action2);
            
        var action3 = component.get("c.getPicklistValues");
        action3.setParams({ objectName : 'Checks__c',
                           fieldName : 'Check_Delay_Reason__c' });
     
        var opts3=[];
        action3.setCallback(this, function(a3) {

         for(var i=0;i< a3.getReturnValue().length;i++){
              opts3.push({"class": "optionClass", label: a3.getReturnValue()[i], value: a3.getReturnValue()[i]});
          }
         component.set("v.varcheckDelayReason", opts3);
             
        });
        $A.enqueueAction(action3);
            
        helper.addCheckRecord(component, event);    
        }catch(e){
            console.log(e.message); 
            helper.showErrorMessage(component, event, helper, e.message);  
        }
        console.log('#### init completed..!');
	},
    
    redirectToDocupaceStatusWidget: function(component, event, helper) {
       $A.get("e.force:navigateToURL").setParams(
    	{"url": "/apex/DocupaceStatusWidgetRedirector"}).fire();
   	},
    
   openModal: function(component, event, helper) {
 
      var buttonLabel = event.getSource().get("v.label");
      console.log('buttonLabel **'+buttonLabel);
      component.set("v.varIsArchiveClicked",false);
      console.log('-openModal-buttonLabel--'+buttonLabel);
      component.set("v.varIsModalOpen", true); 
     
      component.set("v.varEBWrapper.businessType",buttonLabel);
      component.set("v.varHeaderValue",buttonLabel);
       
      if(buttonLabel == 'New Business'){
         component.set("v.varEBWrapper.radioButtonLabel",'Are you uploading forms with barcode cover pages created through the Create Forms Package or the New Account Wizard?');
       }else if(buttonLabel == 'Existing Business'){
         component.set("v.varEBWrapper.radioButtonLabel",'Are you uploading forms with barcode cover pages created through the Maintenance Wizard?');             
       }else{
         component.set("v.varIsArchiveClicked",true);
       }
    
   },
    
   closeModal: function(component, event, helper) {
       component.set("v.varIsModalOpen", false);
       $A.get('e.force:refreshView').fire();
       
   },
    
   radioButtonClicked: function (component, event) {
        var changeValue = event.getParam("value");

        component.set("v.varRepNumberObj",null);
        component.set("v.varClientObj",null);
        component.set("v.varFinancialAccountObj",null);
        component.set("v.varEBWrapper.clientObj",null);
        component.set("v.varEBWrapper.isClientSelected",false);
        component.set("v.varEBWrapper.requestNumber",'');
        component.set("v.varEBWrapper.selectedSponsor_Cust",'None');
        component.set("v.varEBWrapper.selectedSOF",'None');
        component.set("v.varErrorMsg",'');
       	component.set("v.varEBWrapper.firstName",'');
       	component.set("v.varEBWrapper.lastName",'');
      	component.set("v.varEBWrapper.SSN",'');
        component.set("v.varNewRepName",'');
        component.set("v.varSelectedChecksIncluded",'');       
        component.set("v.varEBWrapper.eBlotter",[]);
        component.set("v.varCheckList",[]);
        component.set("v.varEBWrapper.entity",false);
        component.set("v.varAccountNo",'');
        component.set("v.varIsArchiveClicked",false);
   },
   outReqestNumber : function(component, event, helper) {
      document.getElementById('requestNoId').style.display = 'none';
	},
   checkRequestNumber : function(component, event, helper) {
       var dynamicVal = component.get("v.varEBWrapper.requestNumber");
       component.set("v.varErrorMsg",'');
       document.getElementById('requestNoId').style.display = 'none';
       
     if(dynamicVal != 'undefined' && dynamicVal != null && dynamicVal != ''){
       
       console.log('-dynamicVal--'+dynamicVal);
       
       if(dynamicVal.length > 0){
         for (var i = 0; i < dynamicVal.length; i++) {
           var singleVal= dynamicVal[i];          
       	   var charCode= singleVal.charCodeAt(0);
             
           console.log('--singleVal--'+singleVal+'--charCode--'+charCode);
             
           if(charCode >= 48 && charCode <= 57)      
           {         	          
                console.log('inside none');
                document.getElementById('requestNoId').style.display = 'none';
                
            }else{            
               console.log('--Enter only integer--');
               var resultReq1= dynamicVal.toString().replace(singleVal,'');
               var resultReq= resultReq1.replace(/[^\d].+/, "");
               console.log('--resultReq--'+resultReq);
               component.set("v.varEBWrapper.requestNumber",resultReq);      
               document.getElementById('requestNoId').style.display = 'block';
               return false;
            }  
         }    
       }
      
     }  
       
    },
    
    //Account No input text for Story B-92873
    checkAccountNumber : function(component, event, helper) {
              
     var dynamicVal= event.getSource().get("v.value");
 	 component.set("v.varErrorMsg",'');          
           
    },
    outClientSSN : function(component,event,helper){
        document.getElementById('SSNId').style.display = 'none';
    },
    onClientSSN : function(component,event,helper){
  
       document.getElementById('SSNId').style.display = 'none';     
       var dynamicVal= event.getSource().get("v.value");
       component.set("v.varErrorMsg",'');
        
     if(dynamicVal != 'undefined' && dynamicVal != null && dynamicVal != ''){
        
       if(dynamicVal.length > 0 && component.get("v.varEBWrapper.entity") == false){
         for (var i = 0; i < dynamicVal.length; i++) {
           var singleVal= dynamicVal[i];          
       	   var charCode= singleVal.charCodeAt(0);
             
           console.log('--singleVal--'+singleVal+'--charCode--'+charCode);
             
           if(charCode >= 48 && charCode <= 57)      
           {         	          
                console.log('inside none');
                document.getElementById('SSNId').style.display = 'none';
                
            }else{            
               console.log('--Enter only integer--');             
               var resultSSN1= dynamicVal.toString().replace(singleVal,'');
               var resultSSN= resultSSN1.replace(/[^\d].+/, "");
               console.log('--resultSSN--'+resultSSN); 
               component.set("v.varEBWrapper.SSN",resultSSN);
               document.getElementById('SSNId').style.display = 'block';
             
               return false;
            }  
         }    
       }
      
        console.log('--entity--'+component.get("v.varEBWrapper.entity"));
        if(dynamicVal.toString().length != 9 && component.get("v.varEBWrapper.entity") == false){       
              
             component.set("v.varErrorMsg",'Client SSN should be of 9 digits and numeric');
             return false;
        }else {
            component.set("v.varErrorMsg",'');  
        }
        if(dynamicVal.toString().length != 12 && component.get("v.varEBWrapper.entity") == true){       
              component.set("v.varErrorMsg",'Client SSN should be of 12 digits');
             return false;
           
        }else{
             component.set("v.varErrorMsg",''); 
        }
      }
    },
    onFirstName : function(component,event,helper){
    var dynamicVal= event.getSource().get("v.value");
    	if(dynamicVal != 'undefined' && dynamicVal != null && dynamicVal != ''){    
 	 	component.set("v.varErrorMsg",'');
	   }
	},
 	onLastName : function(component,event,helper){
    var dynamicVal= event.getSource().get("v.value");
 	if(dynamicVal != 'undefined' && dynamicVal != null && dynamicVal != ''){    
 	 	component.set("v.varErrorMsg",'');
	  }
	},
    onEntity : function(component,event,helper){
        var entity= component.get("v.varEBWrapper.entity");
        var SSN= component.get("v.varEBWrapper.SSN");
        component.set("v.varErrorMsg",''); 
        if(SSN != 'undefined' && SSN != ''){
        console.log(SSN+'-SSN onEntity-'+entity+'--SSN.toString.length--'+SSN.toString().length);
        if(entity == true && SSN.toString().length != 12){
              component.set("v.varErrorMsg",'Client SSN should be of 12 digits');
        }else if(entity == false && SSN.toString().length != 9){
               component.set("v.varErrorMsg",'Client SSN should be of 9 digits and numeric');
              //Only Integer
              var resultSSN= SSN.replace(/[^\d].+/, "");
              console.log('-onEntity-resultSSN--'+resultSSN); 
              component.set("v.varEBWrapper.SSN",resultSSN);
              if(resultSSN.toString().length == 9){
                component.set("v.varErrorMsg",'');
              }
        }else{
             component.set("v.varErrorMsg",''); 
        }
       }
    },
    /*
     * For populating the Client record ...For New Business
    */
    onClientSelect : function(component, event, helper) {
        try{
            component.set("v.varErrorMsg",'');
            var clientObj = component.get("v.varClientObj");
            component.set("v.varEBWrapper.clientObj",clientObj);
            component.set("v.varEBWrapper.firstName",clientObj.FirstName);
            component.set("v.varEBWrapper.lastName",clientObj.LastName);
            component.set("v.varEBWrapper.SSN",clientObj.SSN__c);
            component.set("v.varEBWrapper.entity",false);
            if(clientObj != undefined && clientObj != 'undefined' && clientObj.RecordType != undefined && clientObj.RecordType != 'undefined'){
            if(clientObj.RecordType.DeveloperName == 'Entity' ||  clientObj.RecordType.DeveloperName == 'Books_Records_Entity')
            {
             component.set("v.varEBWrapper.entity",true);   
            }
           }
            console.log(clientObj+'-onClientSelect-clientObj--ID--'+clientObj.Id+'--first Name--'+clientObj.FirstName);
            component.set("v.varEBWrapper.isClientSelected",false);
            if(clientObj.Id != 'undefined' && clientObj.Id != undefined)
            {
                component.set("v.varEBWrapper.isClientSelected",true);  
            }          
            
        }catch(e){
            console.log(e.message);
            helper.showErrorMessage(component, event, helper, e.message); 
        }  
    },
    
    /*
     * For repNumber pop-up... For New Business
    */
    repNumberSearch : function(component, event, helper) {
        try{
            helper.showErrorMessage(component, event, helper, ''); 
     
            var lookUpDiv = component.find("lookupDiv");
            helper.toggleSpinner(component, event, helper, 'slds-show');
            $A.createComponent('c:repNumberSearch', {"modelSize": 'slds-modal_medium',
                                                     "fromPlanAgreement": false,
                                                     "repNumber":component.get("v.varNewRepName")},
                               function (contentComponent, status, error) {
                                   if (status === "SUCCESS") {
                                       console.log('-contentComponent--'+contentComponent);
                                       lookUpDiv.set('v.body', contentComponent);
                                   }else{
                                       var msg = component.get("v.errorMessage");
                                       helper.showErrorMessage(component, event, helper, msg);  
                                   }
                                   helper.toggleSpinner(component, event, helper, 'slds-hide');
                               });
        }catch(e){
            console.log(e.message); 
            helper.showErrorMessage(component, event, helper, e.message);  
        }
    }, 
    /*
     * For repNumber search event... For New Business
    */
    repNumberSearchEventHandler : function(component, event, helper) {
        try{
            
            var RepNumberRecordId = event.getParam("RepNumberRecordId");
            var selectedRepNumber= event.getParam("selectedRepNumber");
            var selectedRepNumberUser= event.getParam("selectedRepNumberUser");
            var selectedRepNumberName= event.getParam("selectedRepNumberName");
            console.log('###---selectedRepNumber '+ selectedRepNumber);
            console.log('###---selectedRepNumberUser '+ selectedRepNumberUser);
            console.log('###---selectedRepNumberName '+ selectedRepNumberName);
            
            component.set("v.varRepNumber", selectedRepNumber);
            var repNumberObj = {};
            repNumberObj.Id = selectedRepNumberUser;
            repNumberObj.Name = selectedRepNumberName;
            repNumberObj.Rep_Number__c = selectedRepNumber;
            
            component.set("v.varRepNumberObj", repNumberObj);           
            component.set("v.varNewRepName", selectedRepNumberName);
          
            //For Refreshing the Rep Number lookup when searching record from pop window
            component.set("v.varSelectedRadioButtonVal","Yes");
            component.set("v.varSelectedRadioButtonVal","No");
          

        }catch(e){
            console.log(e.message); 
            helper.showErrorMessage(component, event, helper, e.message); 
        }  
    },
    /*
     * For repNumber search event from customlookup ... For New Business
    */
    onRepNumberSelect : function(component, event, helper) {
      
        try{
            component.set("v.varErrorMsg",'');
            var repNumberObj = component.get("v.varRepNumberObj");
            component.set("v.varEBWrapper.repNumberObj",repNumberObj);
            
            console.log('###--- onRepNumberSelect repNumberObj '+ JSON.stringify(repNumberObj));
            /*if(!$A.util.isEmpty(repNumberObj) && !$A.util.isUndefinedOrNull(repNumberObj.Rep_Number__r) && !$A.util.isUndefinedOrNull(repNumberObj.Rep_Number__r.Rep_Number__c)){
                component.set("v.varRepNumber", repNumberObj.Rep_Number__r.Rep_Number__c);
               
            }*/
          
        }catch(e){
            console.log(e.message); 
            helper.showErrorMessage(component, event, helper, e.message); 
        }  
    },
    /*
     * For populating the Financial Account record ...For Existing Business 
    */
    onFinancialAccountSelect : function(component, event, helper) {
        try{
            component.set("v.varErrorMsg",'');
            var financialAccountObj = component.get("v.varFinancialAccountObj");
            component.set("v.varEBWrapper.financialAccountObj",financialAccountObj);
            console.log('--onFinancialAccountSelect--'+onFinancialAccountSelect);
           
        }catch(e){
            console.log(e.message);
            helper.showErrorMessage(component, event, helper, e.message); 
        }  
    },
    onSponsorCust : function(component,event,helper){
         var sponsorCust= event.getSource().get("v.value");
         console.log(sponsorCust+'--on onSponsorCust--');
         if(sponsorCust == 'None' || sponsorCust == '' || sponsorCust == 'undefined'){
            component.set("v.varErrorMsg","Please select field : Sponsor/Custodian");
        	return false; 
         }else{
            component.set("v.varErrorMsg",'');
         }
    },
    onOtherSponsorCust : function(component,event,helper){
        var otherSponsorCust= event.getSource().get("v.value");
         console.log(otherSponsorCust+'--on otherSponsorCust--');
         if(otherSponsorCust == '' || otherSponsorCust == 'undefined'){
            component.set("v.varErrorMsg","Please enter Other Sponsor Custodian");
        	return false; 
         }else{
            component.set("v.varErrorMsg",'');
         } 
    },
    onChecksIncluded : function(component, event, helper) {
        component.set("v.varErrorMsg","");
        component.set("v.varCheckList",[]);
        component.set("v.varEBWrapper.selectedSOF","None");
        component.set("v.varEBWrapper.eBlotter.Other_Source_of_Funds__c","");
        component.set("v.varEBWrapper.eBlotter.Branch_Received_Date__c","");
        component.set("v.varEBWrapper.eBlotter.Overnight_Tracking__c","");
        component.set("v.varEBWrapper.eBlotter.Solicited_UnSolicited__c","");
       
        helper.addCheckRecord(component, event);
       
    },
    onRadioSoli_UnSoli : function(component, event, helper) {
        component.set("v.varErrorMsg","");
    },
    onSOF : function(component,event,helper){
        
        var sof= event.getSource().get("v.value");
         console.log(sof+'--on onSOF--');
         if(sof == 'None' || sof == '' || sof == 'undefined'){
            component.set("v.varErrorMsg","Please select field : Source of funds");
        	return false; 
         }else{
            component.set("v.varErrorMsg",'');
         }

    },
    onOtherSOF : function(component,event,helper){
        var otherSof= event.getSource().get("v.value");
         console.log(otherSof+'--on otherSof--');
         if(otherSof == '' || otherSof == 'undefined'){
            component.set("v.varErrorMsg","Please enter Other Source of funds");
        	return false; 
         }else{
            component.set("v.varErrorMsg",'');
         } 
    },
    onBRDateChange : function(component,event,helper){
        
        var selectedBRDate= component.find("branchReceivedDateId").get("v.value");
        document.getElementById('BRD').style.display = 'none';
        component.set("v.varErrorMsg",'');
        console.log("1- selectedBRDate --"+selectedBRDate);
        
      if(selectedBRDate != 'undefined' && selectedBRDate != null && selectedBRDate != ''){ 
          
            var todayDatetime = new Date();  
          	var todayDateStr = todayDatetime.getFullYear() + '-' + (todayDatetime.getMonth() + 1) + '-' + todayDatetime.getDate();
          	var todayDate = new Date(todayDateStr);
          	
          	var brDateArray = selectedBRDate.split("-");
          	var branchReceivedDate = new Date(brDateArray[0] + '-' + parseInt(brDateArray[1]) + '-' + parseInt(brDateArray[2]));
          	
           console.log('branchReceivedDate 1 ::: ' + branchReceivedDate);
           console.log('todayDate ::: ' + todayDate);
          
          	
           if(branchReceivedDate != null){
            var dayDiff= (branchReceivedDate - todayDate) / (1000*60*60*24);          
           
        	console.log('#### dayDiff = '+dayDiff);
            if(dayDiff>0 || dayDiff < (-90)) {
  
                document.getElementById('BRD').style.display = 'block';
            } else {
                document.getElementById('BRD').style.display = 'none';
            }           
          }           
      }
      
    },
   
   onCheckIssueDateChange : function(component,event,helper){
      
       var dynamicName= event.getSource().get("v.name"); 
       var dynamicVal= event.getSource().get("v.value");
       var index = dynamicName.slice(4, 5);
       document.getElementById('CID '+index).style.display = 'none';
       component.set("v.varErrorMsg",''); 
       
       var checkList = component.get("v.varCheckList"); 
               
       for(var i=0;i<checkList.length;i++)
        {  
       		var selectedCIDate= checkList[i].Check_Issue_Date__c;
            console.log('#### selectedCIDate = '+selectedCIDate);
            
           if(selectedCIDate != 'undefined' && selectedCIDate != null && selectedCIDate != ''){
               
            var todayDatetime = new Date();  
          	var todayDateStr = todayDatetime.getFullYear() + '-' + (todayDatetime.getMonth() + 1) + '-' + todayDatetime.getDate();
          	var todayDate = new Date(todayDateStr);
          	
          	var checkIssueDateArray = selectedCIDate.split("-");
          	var checkIssueDate = new Date(checkIssueDateArray[0] + '-' + parseInt(checkIssueDateArray[1]) + '-' + parseInt(checkIssueDateArray[2]));
          	
           console.log('checkIssueDate 1 ::: ' + checkIssueDate);
           console.log('todayDate ::: ' + todayDate);   
             
            
           if(checkIssueDate != null){
            var dayDiff= (checkIssueDate - todayDate) / (1000*60*60*24);
        	console.log('#### dayDiff = '+dayDiff);
                
            if(dayDiff>0 || dayDiff < (-90)) {
                console.log('#### add error for index '+i);
                document.getElementById('CID '+(i+1)).style.display = 'block';
            } else {
                document.getElementById('CID '+(i+1)).style.display = 'none';
            }
           
           }  
        }
       }
      
     
    },
    outCheckNumber : function(component, event, helper) {
         var dynamicName= event.getSource().get("v.name");
         var index = dynamicName.slice(4, 5);
         console.log('outCheckNumber--dynamicName--'+dynamicName+'--index--'+index);
         document.getElementById('CN '+index).style.display = 'none';
    },
    onCheckNumber : function(component, event, helper) {
        
       var dynamicName= event.getSource().get("v.name"); 
       var dynamicVal= event.getSource().get("v.value");
       var index = dynamicName.slice(4, 5);
       document.getElementById('CN '+index).style.display = 'none';
       component.set("v.varErrorMsg",'');
        
     if(dynamicVal != 'undefined' && dynamicVal != null && dynamicVal != ''){  
        
      
       var inn= Number(index)-1;
       console.log('-index--'+index+'-inn-'+inn);
       if(dynamicVal.length > 0){
         for (var i = 0; i < dynamicVal.length; i++) {
           var singleVal= dynamicVal[i];          
       	   var charCode= singleVal.charCodeAt(0);
             
           console.log('--singleVal--'+singleVal+'--charCode--'+charCode);
             
           if(charCode >= 48 && charCode <= 57)      
           {         	          
                console.log('inside none');
                document.getElementById('CN '+index).style.display = 'none';
                
            }else{            
               console.log('--Enter only integer--');
               var resultCN1= dynamicVal.toString().replace(singleVal,'');       
          	   var resultCN= resultCN1.replace(/[^\d].+/, "");
               console.log('--resultCN--'+resultCN);
               component.set("v.varCheckList["+inn+"].Check_Number__c",resultCN);       
          	  
               document.getElementById('CN '+index).style.display = 'block';
               return false;
            }  
         }    
       }
            
     }
    },
    outCheckAmount  : function(component,event,helper){
        var dynamicName= event.getSource().get("v.name");
        var index = dynamicName.slice(3, 4);
        console.log('outCheckAmount--dynamicName--'+dynamicName+'--index--'+index);
        document.getElementById('CM '+index).style.display = 'none';
    },
    onCheckAmount : function(component,event,helper){
    
       var dynamicName= event.getSource().get("v.name"); 
       var dynamicVal= event.getSource().get("v.value");
       var index = dynamicName.slice(3, 4);
       document.getElementById('CM '+index).style.display = 'none';
       component.set("v.varErrorMsg",'');
        
     if(dynamicVal != 'undefined' && dynamicVal != null && dynamicVal != ''){
       
       
       var inn= Number(index)-1;
       console.log('-index--'+index+'-inn-'+inn);
       if(dynamicVal.length > 0){
         for (var i = 0; i < dynamicVal.length; i++) {
           var singleVal= dynamicVal[i];          
       	   var charCode= singleVal.charCodeAt(0);
             
           console.log('--singleVal--'+singleVal+'--charCode--'+charCode);
             
           if((charCode >= 48 && charCode <= 57) || charCode == 46)       
           {         	          
                console.log('inside none');
                document.getElementById('CM '+index).style.display = 'none';
                
            }else {            
               console.log('--Enter only number--');
               var resultCM1= dynamicVal.toString().replace(singleVal,'');       
           	   var resultCM= resultCM1.replace(/[^0-9\.]/g, "");
               console.log('--resultCM--'+resultCM);
               component.set("v.varCheckList["+inn+"].Check_Amount__c",resultCM);       
           	   
               document.getElementById('CM '+index).style.display = 'block';
 
               return false;
            }  
         }    
       }
       
     }
	},
    onCheckDelayReasonChange : function(component,event,helper){
               
        var dynamicName= event.getSource().get("v.name"); 
        var dynamicVal= event.getSource().get("v.value");
        component.set("v.varErrorMsg",'');
        //alert(dynamicName+'--dynamicName--dynamicVal--'+dynamicVal);
        var index = dynamicName.slice(4, 5);
        var inn= Number(index)-1;
        var checkNotes= component.get("v.varCheckList["+inn+"].Check_Notes__c");
        console.log(checkNotes+'-checkNotes--onCheckDelayReasonChange--index--'+index+'--inn--'+inn);
        if((dynamicVal == 'OTHER (provide explanation in the notes section)' 
        || dynamicVal == 'My office received but did not forward the check within 24 hours (provide explanation in the notes section)')        
             && (checkNotes == '' || checkNotes == null ))
        {
            document.getElementById('CheckNotes '+index).style.display = 'block';
            return false;
        }else{
           document.getElementById('CheckNotes '+index).style.display = 'none';
           component.set("v.varErrorMsg",'');
           
        }
        
    },
    onCheckNotes : function(component,event,helper){
       
        var dynamicName= event.getSource().get("v.name");
        var dynamicVal= event.getSource().get("v.value");
        var index = dynamicName.slice(11, 12);
        console.log(dynamicName+'-dynamicName-onCheckNotes--index--'+index+'-dynamicVal-'+dynamicVal);
        component.set("v.varErrorMsg",'');
        
        if(dynamicVal == '' || dynamicVal == null || dynamicVal == 'null')
        {
            document.getElementById('CheckNotes '+index).style.display = 'block';
            return false;
        }else{
            if(document.getElementById('CheckNotes '+index) != null)
            {
            document.getElementById('CheckNotes '+index).style.display = 'none';
            component.set("v.varErrorMsg",'');
            }
        }
	},
    
  upload : function(component, event, helper) {
        console.log('--Upload callling--');

       var isArchiveClicked= component.get("v.varIsArchiveClicked");
       var accountNo= component.get("v.varAccountNo");
       var recordString= '';
       var financialAccountObj= component.get("v.varFinancialAccountObj.Id");
       var clientObj= component.get("v.varClientObj.Id");
        
      
        var eb= component.get("v.varEBWrapper");
        console.log('eBWrapperJ--'+eb);
        
        component.set("v.varErrorMsg","");
        var selectedRadioButtonVal= component.get("v.varSelectedRadioButtonVal");
        var requestNumber= component.get("v.varEBWrapper.requestNumber");
        var businessType= component.get("v.varEBWrapper.businessType");
       
        var firstName= component.get("v.varEBWrapper.firstName");
        var lastName= component.get("v.varEBWrapper.lastName");
        var SSN= component.get("v.varEBWrapper.SSN");
        var Entity= component.get("v.varEBWrapper.entity");
        
        var repNumberObj= component.get("v.varRepNumberObj");
        var repNumberObjId= component.get("v.varRepNumberObj.Id");
        
        var selectedSponsor= component.get("v.varEBWrapper.selectedSponsor_Cust");
        var selectedOtherSponsor= component.get("v.varEBWrapper.eBlotter.Other_Sponsor_Custodian__c");
        
        var selectedChecksIncluded= component.get("v.varSelectedChecksIncluded");
        var selectedSOF= component.get("v.varEBWrapper.selectedSOF");
        var selectedOtherSOF= component.get("v.varEBWrapper.eBlotter.Other_Source_of_Funds__c");
        var BRD= component.get("v.varEBWrapper.eBlotter.Branch_Received_Date__c");
        var overNightTracking= component.get("v.varEBWrapper.eBlotter.Overnight_Tracking__c");
        var solicitedOrNot= component.get("v.varEBWrapper.eBlotter.Solicited_UnSolicited__c");
        
        var checkList = component.get("v.varCheckList");
        console.log(SSN+'-SSN--clientObj--'+clientObj+'-firstName-'+firstName+'--Entity--'+Entity);
         
       if(!isArchiveClicked){
           
        if(selectedRadioButtonVal == 'Yes' && (requestNumber == 'null ' || requestNumber == '')){
            component.set("v.varErrorMsg","Please enter field : Request Number");           
        	return false;
        } 
        console.log(financialAccountObj+'--financialAccountObj---BRD--'+BRD+'--solicitedOrNot--'+solicitedOrNot);
        if(selectedRadioButtonVal == 'No' && businessType == 'New Business'){
        
         if(clientObj == '' || clientObj == null || clientObj == 'undefined')
         {
          console.log('firstName--'+firstName);
            
         if(Entity == false && (firstName == '' || firstName == null || firstName == 'undefined'))
          {
            component.set("v.varErrorMsg","Please enter field : First Name");
        	return false;   
          }
          if(lastName == '' || lastName == null || lastName == 'undefined')
          {
            component.set("v.varErrorMsg","Please enter field : Last Name");
        	return false;   
          }
                      
        }
         console.log('--SN.toString().length--'+SSN.toString().length+'--starts with-00-'+SSN.toString().startsWith('00'));
         if(SSN == '' || SSN == null || SSN == 'undefined' ) 
         {
            component.set("v.varErrorMsg","Please select valid Client who has valid SSN OR enter valid SSN");
        	return false;   
         }else{
             if((SSN.toString().length < 9 || SSN.toString().length > 9) && Entity == false){// ||  (SSN.toString().startsWith('0') == false) ){
               component.set("v.varErrorMsg","Client SSN should be of 9 digits and numeric");
        	   return false;
             }
             if((SSN.toString().length < 12 || SSN.toString().length > 12) && Entity == true){
                component.set("v.varErrorMsg","Client SSN should be of 12 digits ");
        	    return false;
             }
         }
         
         if(repNumberObj == '' || repNumberObj == null || repNumberObj == 'undefined')
         {
            component.set("v.varErrorMsg","Please enter valid Rep Number");
        	return false; 
       	 }
        }
        if(selectedRadioButtonVal == 'No' && businessType == 'Existing Business' && (financialAccountObj == '' || financialAccountObj == null || financialAccountObj == 'undefined'))
        {
           component.set("v.varErrorMsg","Please enter valid Account Number");
        	return false; 
        }
    	
           
		//console.log(clientObj+'--firstName--'+firstName+'--requestNumber--'+requestNumber+'-selectedSponsor-'+selectedSponsor+'-selectedOtherSponsor-'+selectedOtherSponsor+'-selectedSOF-'+selectedSOF);
      if(selectedRadioButtonVal == 'No'){
        if(selectedSponsor == '' || selectedSponsor == 'None')
        {
            component.set("v.varErrorMsg","Please select field : Sponsor/Custodian");
        	return false; 
        }
        if(selectedSponsor == 'OTHER' && (selectedOtherSponsor == '' || selectedOtherSponsor == null || selectedOtherSponsor =='undefined'))
        {
            component.set("v.varErrorMsg","Please enter other Sponsor/Custodian");
        	return false;
        }
       }
        if(selectedChecksIncluded == '')
        {
            component.set("v.varErrorMsg","Please select field : Checks included");
        	return false;    
        }
       if(selectedChecksIncluded == 'Yes'){
        if(selectedSOF == '' || selectedSOF == 'None')
        {
            component.set("v.varErrorMsg","Please select field : Source of Funds");
        	return false; 
        }   
        if(selectedSOF == 'Other' && (selectedOtherSOF == '' || selectedOtherSOF == null || selectedOtherSOF =='undefined'))
        {
            component.set("v.varErrorMsg","Please enter other Source of funds");
        	return false;
        }
        console.log('checkList.length---'+checkList.length);
        if(BRD == 'undefined' || BRD == '' || BRD == null)
        {
            component.set("v.varErrorMsg","Please select Branch Received Date");
        	return false;
        }
        var BRDspan = document.getElementById('BRD');
        if(window.getComputedStyle(BRDspan).display == 'block'){
            //component.set("v.varErrorMsg","Please check Branch Received Date.");
            console.log('inside BRD block');
        	return false;    
        }
        if(solicitedOrNot == 'undefined' || solicitedOrNot == '' || solicitedOrNot == null)
        {
            component.set("v.varErrorMsg","Please select either Solicited or Unsolicited");
        	return false;
        }
        for(var i=0;i<checkList.length;i++)
        {
        	var errorStr= '';
            
             var idCN= 'CheckNotes '+(i+1);
             console.log('idCN--'+idCN);
             var CNspan = document.getElementById('CheckNotes '+(i+1));
        	 if(window.getComputedStyle(CNspan).display == 'block'){
            	//component.set("v.varErrorMsg","Please Check, Check Issue Date.");
            	console.log('inside Check Notes block');
        		return false;    
       		 }
            
             console.log(i+'-Check Issue Date--'+checkList[i].Check_Issue_Date__c+'--de--'+checkList[i].Check_Delay_Reason__c);
            if(checkList[i].Check_Issue_Date__c == '' || checkList[i].Check_Issue_Date__c == null)
            {
                console.log("inside check");
                component.set("v.varErrorMsg","Please select Check Issue Date");
				//errorStr= '- Check Issue Date \n';               
        		return false; 
            }
            if(checkList[i].Check_Amount__c == '' || checkList[i].Check_Amount__c == null)
            {
                component.set("v.varErrorMsg","Please enter Check Amount");
				//errorStr += '- Check Amount \n';                
        		return false; 
            }
            if(checkList[i].Check_Number__c == '' || checkList[i].Check_Number__c == null)
            {
                component.set("v.varErrorMsg","Please enter Check Number");
				//errorStr += '- Check Number \n';               
        		return false; 
            }
            var idC= 'CID '+(i+1);
            console.log('id--'+idC);
            var CIDspan = document.getElementById('CID '+(i+1));
        	if(window.getComputedStyle(CIDspan).display == 'block'){
            	//component.set("v.varErrorMsg","Please Check, Check Issue Date.");
            	console.log('inside CID block');
        		return false;    
       		}
            
            if(BRD != 'undefined' && BRD != null && BRD != ''){
                
      		var todayDatetime = new Date();  
          	var todayDateStr = todayDatetime.getFullYear() + '-' + (todayDatetime.getMonth() + 1) + '-' + todayDatetime.getDate();
          	var todayDate = new Date(todayDateStr);
          	
          	var brDateArray = BRD.split("-");
          	var branchReceivedDate = new Date(brDateArray[0] + '-' + parseInt(brDateArray[1]) + '-' + parseInt(brDateArray[2]));
          	
            console.log('branchReceivedDate 1 ::: ' + branchReceivedDate);
            console.log('todayDate ::: ' + todayDate);
            
            if(branchReceivedDate != null){
             var dayDiff= (branchReceivedDate - todayDate) / (1000*60*60*24);          
        	 console.log('#### dayDiff for check delay reason in upload = '+dayDiff);
           
             if(dayDiff<0 && (checkList[i].Check_Delay_Reason__c == 'None' || checkList[i].Check_Delay_Reason__c == ''))
             {
                component.set("v.varErrorMsg","Check delay reason is required when Branch Received Date is not Current Date.");               
        		return false; 
             }
            }
           }
           
           
        }
       //console.log('errorStr---'+errorStr);
       /*if(errorStr != '')
       {
          component.set("v.varErrorMsg",'Please Enter '+errorStr); 
          return false; 
       }*/
        }
       }else{
            console.log(clientObj);
            // Story B-92873 Archive Document 
            if((accountNo == '' || accountNo == null || accountNo == 'undefined')
                && (clientObj == '' || clientObj == null || clientObj == 'undefined'))
       	 	{
           	component.set("v.varErrorMsg","Please enter valid Client OR Account Number");
        	return false; 
            }else{
                financialAccountObj= accountNo;
            }
       }            
      
       recordString='#selectedRadioButtonVal#'+selectedRadioButtonVal+'#requestNumber#'
       +requestNumber+'#businessType#'+businessType+'#firstName#'+firstName+'#lastName#'+lastName+'#SSN#'+SSN
       +'#Entity#'+Entity+'#financialAccountObj#'+financialAccountObj+'#repNumberObjId#'+repNumberObjId
       +'#selectedSponsor#'+selectedSponsor+'#selectedOtherSponsor#'+selectedOtherSponsor
       +'#selectedSOF#'+selectedSOF+'#selectedOtherSOF#'+selectedOtherSOF+'#BRD#'+BRD
       +'#overNightTracking#'+overNightTracking+'#solicitedOrNot#'+solicitedOrNot+'#selectedChecksIncluded#'
       +selectedChecksIncluded+'#isArchiveClicked#'+isArchiveClicked+'#clientObj#'+clientObj+'#End#';
                  
        var actionUpload = component.get("c.uploadDataNDoc");
        actionUpload.setParams({ recordStr : recordString, checkList : checkList});
                           
        actionUpload.setCallback(this, function(re) {
            
            var myStr= re.getReturnValue();
            console.log('--result of upload-myStr-'+myStr);
            var eBlotterIdJ = myStr.match("eBlotterIdStart(.*)eBlotterIdEnd");
            var sURL = myStr.match("eBlotterIdEnd(.*)sURL");
           
            console.log(eBlotterIdJ[1]+'<--eBlotterIdJ- and sURL-->'+sURL[1]);
            
            if (sURL == 'error'){
                alert('Error while scanning with Docupace. Please contact System Administrator.');
            	return false;
                
            }else if(sURL == 'ERROR in Data'){
                alert('Error in data. Please contact System Administrator.');
            	return false;
             }
             else {
                 window.open(sURL[1],'Quotes','height=850,width=900,resizable=yes','_blank','fullscreen=yes');
                 component.set("v.varDataUploded",true);
                 //if(selectedChecksIncluded == 'Yes'){
                     setTimeout(function(){ 
                       var actionSubmit = component.get("c.callSubmit");
       				   actionSubmit.setParams({ eBlotterId : eBlotterIdJ[1]});
                           
        			   actionSubmit.setCallback(this, function(re) { 
                       console.log('-callSubmit calling-');
                       
                	   $A.get('e.force:refreshView').fire();
                           
                      });
                     $A.enqueueAction(actionSubmit);      
                    }, 15000);
                // }                
             }
        });
        $A.enqueueAction(actionUpload);                
    },
    
    addRow: function(component, event, helper) {
        component.set("v.varErrorMsg",'');
        helper.addCheckRecord(component, event);
    },
     
    removeRow : function(component, event, helper) {
        //Get the check list
        component.set("v.varErrorMsg",'');
       
        var clickedBtn =  event.getSource().get("v.label");        
        var index = clickedBtn.slice(13, 14);
        console.log(clickedBtn+'-removeRow-index--'+index);
        var checkList = component.get("v.varCheckList"); 
        
        var selectedItem = event.currentTarget;
        checkList.splice(index-1, 1);        
        component.set("v.varCheckList", checkList);
        
        setTimeout(function(){ 
          console.log('--checkList.length--'+checkList.length);
          for(var i=0;i<checkList.length;i++)
       	  {
            var selectedCIDate= checkList[i].Check_Issue_Date__c;
              
           if(selectedCIDate != 'undefined' && selectedCIDate != null && selectedCIDate != ''){
               
            var todayDatetime = new Date();  
          	var todayDateStr = todayDatetime.getFullYear() + '-' + (todayDatetime.getMonth() + 1) + '-' + todayDatetime.getDate();
          	var todayDate = new Date(todayDateStr);
          	
          	var checkIssueDateArray = selectedCIDate.split("-");
          	var checkIssueDate = new Date(checkIssueDateArray[0] + '-' + parseInt(checkIssueDateArray[1]) + '-' + parseInt(checkIssueDateArray[2]));
          	
           console.log('checkIssueDate 1 ::: ' + checkIssueDate);
           console.log('todayDate ::: ' + todayDate);   
            
            if(checkIssueDate != null){
            var dayDiff= (checkIssueDate - todayDate) / (1000*60*60*24);

        	console.log('#### dayDiff = '+dayDiff);
                
           if(dayDiff>0 || dayDiff < (-90)) {
                console.log('#### add error for index '+i);
                document.getElementById('CID '+(i+1)).style.display = 'block';
               
            }else {
                document.getElementById('CID '+(i+1)).style.display = 'none';
            }
             if((checkList[i].Check_Delay_Reason__c == 'OTHER (provide explanation in the notes section)' 
        		|| checkList[i].Check_Delay_Reason__c == 'My office received but did not forward the check within 24 hours (provide explanation in the notes section)')        
                 && (checkList[i].Check_Notes__c == '' || checkList[i].Check_Notes__c == null ))
               {
                 document.getElementById('CheckNotes '+(i+1)).style.display = 'block';
                 
               }else{
                 document.getElementById('CheckNotes '+(i+1)).style.display = 'none';
                
              }
            
            } //End of thisdate not null
           }
         } //End of for loop
            
        }, 500);
     
     },    

   
})