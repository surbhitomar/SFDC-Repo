public class Account_CommonUtil {

    @AuraEnabled
    public static list<AccountWrapper> fetchAccountRecord(){
        
        list<AccountWrapper> AccountWrapperList= new list<AccountWrapper>();
        list<Account> accList= [Select id,Name,AccountNumber,OwnerId,Owner.Name,AccountSource,AnnualRevenue,Type,Industry,
                                CreatedById,CreatedBy.Name from Account limit 7];
        if(accList.size()>0){
            for(Account acc : accList){
                AccountWrapperList.add(new AccountWrapper(false,acc));
            }
        }
        return AccountWrapperList;
    }

   
    public class AccountWrapper{
        
        @AuraEnabled
        public Boolean isSelect{get;set;}
        @AuraEnabled 
        public Account account{get;set;}
        public AccountWrapper(boolean isSelect,Account account){
            this.account= account;
            this.isSelect= isSelect;
            
        } 
        
    }
}