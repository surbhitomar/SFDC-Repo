public class VF_and_LC_CommunicationCtrl {

    public VF_and_LC_CommunicationCtrl(ApexPages.StandardController controller) {
    
       system.debug('--VF_and_LC_CommunicationCtrl constructor calling--'); 
    }
    public void pageAction()
    {
     system.debug('--pageAction calling');
     
    
    }

    @AuraEnabled 
    public static void sendMailMethod(String mSubjectC ,String mbodyC, String caseIdC,sObject conSObject,String templateIdC,List<sObject> selectedRecordAdditionalTols,List<sObject> selectedRecordCCls,List<sObject> selectedRecordBCCls )
    {
        system.debug('sendMailMethod Called');
        system.debug('selectedRecordAdditionalTols-->>'+selectedRecordAdditionalTols);
        system.debug('selectedRecordCCls-->>'+selectedRecordCCls);
        system.debug('selectedRecordBCCls-->>'+selectedRecordBCCls);
        
        List<Messaging.SingleEmailMessage> mails =  new List<Messaging.SingleEmailMessage>(); 
                BrandTemplate brandTemplateObj = [select id from BrandTemplate where name='Ofcom Standard' limit 1];
        EmailTemplate emTempObj = [select id,name,DeveloperName,body,HtmlValue,subject from emailtemplate where DeveloperName='Devolve_Case_Consumer_Complaint'  and BrandTemplateId =: brandTemplateObj.id limit 1];                
        Contact con=(Contact)conSObject;
        Contact conRecord = [SELECT Id,Name,Email FROM Contact WHERE Id =: con.id ];
        
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        List<String> sendTo = new List<String>();
        sendTo.add(conRecord.Email);
        mail.setTargetObjectId(conRecord.Id);
        
        list<String> emails;
        if(selectedRecordAdditionalTols.size()>0) //AdditionalTo
        {
           emails= new list<String>();
           emails= getEmailList(selectedRecordAdditionalTols);        
           sendTo.addAll(emails);                      
        }
        system.debug('sendTo-->>'+sendTo);
      
        if(selectedRecordCCls.size()>0)
        {
            emails= new list<String>();
            emails= getEmailList(selectedRecordAdditionalTols);       
            system.debug('emails in CC--'+emails);
                        mail.setCcAddresses(emails);
        }        
        if(selectedRecordBCCls.size()>0)
        {
                emails= new list<String>();
            emails= getEmailList(selectedRecordBCCls);       
            system.debug('emails in BCC--'+emails);
                        mail.setCcAddresses(emails);
        }        
                mail.setSaveAsActivity(true);
                mail.setWhatId(caseIdC);
                mail.setTemplateId(emTempObj.id);
        mail.setToAddresses(sendTo);
        mails.add(mail);
        system.debug('mails-->>'+mails);
        Messaging.sendEmail(mails);
    }
    @AuraEnabled
    public static sObject getToAddress(String toAddressC){
        system.debug('toAddressC-->>'+toAddressC);
        if(toAddressC != null){
            Contact conObj = [SELECT Id,LastName, Email FROM Contact WHERE Id =: toAddressC];
            system.debug('conObj--'+conObj);
            String sObjectName = 'Contact';
            sObject obj = Schema.getGlobalDescribe().get(sObjectName).newSObject();
                        obj.put('LastName', conObj.LastName);
                        obj.put('Id', conObj.id);
            obj.put('Email', conObj.Email);
            list<sObject> objList= new list<sObject>();
            objList.add(obj);
            return obj;
        }
        return null;
    }
    
    @AuraEnabled
    public static emailTemplatesWrapper getEmailTemplate(String templateIdC,String recordIdC){
        try{
            system.debug('templateIdC-->>'+templateIdC);
            system.debug('recordIdC-->>'+recordIdC);
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            //Preparing Dummy Contact to send mail.
            User user = [select email, firstName, lastName from User where id =: userInfo.getUserId()];
            Contact tempContact = new Contact(email = user.email, firstName = user.firstName, lastName = user.lastName);
            insert tempContact;
            //BrandTemplate brandTemplateObj = [select id from BrandTemplate where name='Ofcom Standard' limit 1];
            //EmailTemplate emTempObj = [select id,name,DeveloperName,body,HtmlValue,subject from emailtemplate where id =: templateIdC and BrandTemplateId =: brandTemplateObj.id limit 1];                    
            EmailTemplate emTempObj = [select id,name,DeveloperName,body,HtmlValue,subject from emailtemplate where id =: templateIdC limit 1];                    
            
            mail.setTargetObjectId(tempContact.Id);
            mail.setSaveAsActivity(true);       
            mail.setWhatId(recordIdC);
            mail.setSubject(emTempObj.Subject);
            mail.setPlainTextBody(emTempObj.body);
            mail.setHtmlBody(emTempObj.HtmlValue); 
            mail.setTreatTargetObjectAsRecipient(true);
            mail.setTemplateId(emTempObj.Id);
            mail.setTreatBodiesAsTemplate(true);
            //Savepoint
            Savepoint sp = Database.setSavepoint();
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
            //Rollback to Savepoint - To avoid sending mail and now we can get the value for mail.getHtmlBody()
            EmailTemplatesWrapper emailTemplateWrapperObj = new EmailTemplatesWrapper();
            emailTemplateWrapperObj.templateBody = mail.getHtmlBody();
            emailTemplateWrapperObj.templateSubject = mail.Subject;
            Database.rollback(sp);
            delete tempContact;
            return emailTemplateWrapperObj;
                }
                catch(Exception e)
        {
            system.debug('@@Exception' + e.getMessage());
            return null;
        }
        
    }
     public class EmailTemplatesWrapper{
        
        @AuraEnabled 
        public String TemplateId{get;set;}
        
        @AuraEnabled 
        public String templateBody{get;set;}
        
        @AuraEnabled
        public String templateSubject {get;set;}
    }
    public static list<string> getEmailList(list<sObject> sobjectList)
    {
        list<String> emailList= new list<String>();
        List<User> userList = (List<User>)sobjectList;
        for(User usr : [select id,name,email from user where id in : userList])
        {
            system.debug('usr in CC-->>'+usr.email);
                emailList.add(usr.Email); 
        } 
        system.debug('emailList-->>'+emailList);
        system.debug('userList-->'+userList);
        return emailList;
    }
}