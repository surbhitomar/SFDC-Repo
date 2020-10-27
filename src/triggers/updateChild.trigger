trigger updateChild on Account (after update) {

    list<contact> updateCon= new list<contact>();
    set<id> ids= new set<id>();
    
    /*for(Account acc : [select Language__c,(select id,name,Languages__c from contacts) from account where id in : trigger.new])
    {
        ids.add(acc.id);
    }
    
    for(Contact con : [select id,name,Languages__c,Account.Language__c from contact where AccountId in : ids])
     {
         con.Languages__c= con.Account.Language__c;
         updateCon.add(con);
         
     }*/
    
    //Also working fine, if I query this in other class then will hold new value if i pass trigger.new then it will hold new values
    for(Account acc : [select Language__c,(select id,name,Languages__c from contacts) from account where id in : trigger.new])
    {
        for(Contact con : acc.contacts)
        {
            con.Languages__c= acc.Language__c;
            updateCon.add(con);
        }
    }
    


    // If i call it before update then it will pick old value
        
     /*for(Contact con : [select id,name,Languages__c,Account.Language__c from contact where AccountId in : Trigger.new])
     {
         con.Languages__c= con.Account.Language__c;
         updateCon.add(con);
         
     }*/
     
     if(updateCon.size()>0)
     {
         update updateCon;
     }
}