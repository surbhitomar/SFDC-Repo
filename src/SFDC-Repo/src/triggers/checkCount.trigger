trigger checkCount on Contact (before insert,after insert,before update,after update,before delete,after delete,after undelete) 
{
    set<Id> parentId1= new set<Id>();
    List<Id> parentId2= new List<Id>();
    List<Account> updateAcc= new List<Account>();
    
    
    
    
    if(Trigger.isBefore){
      system.debug('IsBefore Trigger.new-->'+Trigger.new);
        if(Trigger.isInsert || Trigger.isUpdate || Trigger.isDelete){
            //[select id, Account.NumberOfEmployees from Contact where is in Trigger.new]
            for(Contact con : trigger.new)
            {
                system.debug(' 1 BEFORE NEW Account.NumberOfEmployees-->>'+con.Account.NumberOfEmployees);
            }
            for(Contact con : [select id, Account.NumberOfEmployees from Contact where id in: Trigger.new])
            {
                system.debug(' 2 BEFORE NEW Account.NumberOfEmployees-->>'+con.Account.NumberOfEmployees);
                parentId1.add(con.AccountId);
            }                                    
        }
    
    
    }
    if(Trigger.isAfter){
     if(Trigger.isInsert || Trigger.isUpdate || Trigger.isDelete || Trigger.isUnDelete){
     
         system.debug('isAfter Trigger.old-->'+Trigger.old);
         system.debug('IsAfter Trigger.new-->'+Trigger.new);
       
         for(Contact con : trigger.new)
         {
                system.debug(' 1 AFTER NEW Account.NumberOfEmployees-->>'+con.Account.NumberOfEmployees);
         }
         for(Contact con : [select id, Account.NumberOfEmployees from Contact where id in: Trigger.new])
         {
             system.debug(' 2 AFTER NEW Account.NumberOfEmployees-->>'+con.Account.NumberOfEmployees);
             parentId1.add(con.AccountId);
         } 
         if(Trigger.isUpdate || Trigger.isDelete){
         
         for(Contact con : trigger.old)
         {
             system.debug(' 1 AFTER OLD Account.NumberOfEmployees-->>'+con.Account.NumberOfEmployees);
         }
         
         for(Contact con : [select id, Account.NumberOfEmployees from Contact where id in : Trigger.old])
         {
             system.debug(' 2 AFTER OLD Account.NumberOfEmployees-->>'+con.Account.NumberOfEmployees);
             parentId1.add(con.AccountId);
         } 
        }
       }
    
    }
    for(Account acc : [select id,NumberOfEmployees,(select id from contacts) from account where id in : parentId1])
    {
      system.debug('Inside 1  ACC Account.NumberOfEmployees-->>'+Acc.NumberOfEmployees);
      Acc.NumberOfEmployees= acc.contacts.size();
      system.debug('Inside 2 ACC Account.NumberOfEmployees-->>'+Acc.NumberOfEmployees);
      updateAcc.add(acc);
    }
    if(updateAcc.size()>0)
    {
        update updateAcc;
    } 

}