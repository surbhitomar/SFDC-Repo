public class wrapperDisplayController {
    
    @AuraEnabled
    public static wrapperClass initMethod(){
        // create a wrapper class object and set the wrapper class @AuraEnabled properties and return it to the lightning component.
        wrapperClass returnwrapperClass = new  wrapperClass ();        
        returnwrapperClass.lstContact = [SELECT firstName, LastName, Department,LeadSource from contact Limit 25];
        returnwrapperClass.contactCount = returnwrapperClass.lstContact.size(); 
        returnwrapperClass.headerMsg = 'This is Sample Header Msg from Wrapper Class';
        return returnwrapperClass;    
    }
    
    // wrapper or Inner class with @AuraEnabled {get;set;} properties*    
    public class wrapperClass{
        @AuraEnabled public List<contact> lstContact{get;set;}
        @AuraEnabled public Integer contactCount{get;set;}
        @AuraEnabled public String headerMsg {get;set;}
    }
    public static void getData()
    {
        
    }
}