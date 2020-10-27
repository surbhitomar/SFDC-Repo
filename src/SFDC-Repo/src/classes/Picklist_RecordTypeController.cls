public class Picklist_RecordTypeController {
    //Wrapper class to return the recordtype object to component
    public class recordTypeWrapper{
        @AuraEnabled public string rtName{get;set;}
        @AuraEnabled public string rtId{get;set;}
        @AuraEnabled public boolean rtIsMaster{get;set;}
        @AuraEnabled public boolean incorrectApiName{get;set;}
    }
    //Wrapper class to handle the JSON response
    public class picklistWrapper{
		@AuraEnabled public piclistValues[] values;
	}
    public class piclistValues {
        @AuraEnabled public String label;	
		@AuraEnabled public String value;
    }
    /* Getting the list of record types accessible to the logged in user */
    @AuraEnabled
    public static list<recordTypeWrapper> getRecordTypes(string ObjectApiName){
        list<recordTypeWrapper> RecordTypeList=new list<recordTypeWrapper>();
        Schema.SObjectType objectType = Schema.getGlobalDescribe().get(ObjectApiName);
        
        if(objectType!=null){
            for(RecordTypeInfo rtInfo: objectType.getDescribe().getRecordTypeInfos()){
                if(rtInfo.isAvailable() && !rtInfo.isMaster()){
                    recordTypeWrapper rtype= new recordTypeWrapper();
                    rtype.rtName=rtInfo.name;
                    rtype.rtId=rtInfo.getRecordTypeId();
                    rtype.rtIsMaster=rtInfo.isMaster();
                    RecordTypeList.add(rtype);
                    system.debug(rtype);
                }                
            }
        }
        else{
            recordTypeWrapper rtype= new recordTypeWrapper();
            rtype.incorrectApiName=true;
            RecordTypeList.add(rtype);
            system.debug('Incorrect ObjectApi Name');
        }
       	return RecordTypeList;
    }
    /* Making callout to the UI API to get the list of available picklist values based on the selected recordtype  */
    public static string[] getPicklistValuesByRecordType(String objectAPIName, String recordTypeDevName, String picklistAPIName)
    {
        string[] piclistValues=new string[]{};
        string BaseUrl=system.Url.getOrgDomainUrl().toExternalForm();
        
        //Id recordTypeId= Schema.getGlobalDescribe().get(objectAPIName).getDescribe().getRecordTypeInfosByName().get(recordTypeDevName).getRecordTypeId();
        Id recordTypeId= Schema.getGlobalDescribe().get(objectAPIName).getDescribe().getRecordTypeInfosByDeveloperName().get(recordTypeDevName).getRecordTypeId();
        system.debug('recordTypeId-->>'+recordTypeId);
        httprequest request= new httprequest();
        request.setMethod('GET');
        String sfdcBaseURL = URL.getSalesforceBaseUrl().toExternalForm();
        
        request.setEndpoint(sfdcBaseURL+'/services/data/v47.0/ui-api/object-info/'
        +objectAPIName+'/picklist-values/'+recordTypeId+'/'+picklistAPIName);
        
        request.setHeader('Authorization', 'OAuth '+UserInfo.getSessionId());
        request.setHeader('Content-Type','application/json; charset=UTF-8');
        request.setHeader('Accept','application/json');
        
        http http = new http();
        httpresponse response=http.send(request);
        picklistWrapper picklistWrapperObj=new picklistWrapper();
        picklistWrapperObj=(picklistWrapper)JSON.deserialize(response.getBody(), picklistWrapper.class);
        
        for(piclistValues pickVal : picklistWrapperObj.values){
            piclistValues.add(pickVal.value);
        }
        system.debug('--piclistValues--'+piclistValues);
        return piclistValues;
       
    }

}