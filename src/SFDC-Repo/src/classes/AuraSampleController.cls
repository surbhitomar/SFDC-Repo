public with sharing class AuraSampleController{
     
    @AuraEnabled
    public static void saveAccounts(List<Account> accList){
        system.debug('accList-->>'+accList);
        Insert accList;
    }
}