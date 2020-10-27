public with sharing class ContactListController {
    
    @auraEnabled
    public static list<contact> findAll(){
        system.debug('--calling--');
       
        return [SELECT Id, Name, MailingStreet, Phone, Email, LeadSource from Contact];
    }
    
    @auraEnabled
    public static list<Contact> findByName(String searchKeyApexText){
        string searchCon= '%' + searchKeyApexText + '%';
        return [SELECT id,name,email from Contact WHERE name LIKE:searchCon LIMIT 20 ];
        
    }

}