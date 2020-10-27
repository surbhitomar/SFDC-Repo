public class CreateRecordCtrl {
    
    @AuraEnabled
    public static String createRecord (Opportunity oppC){
        
        String returnResult='';
        
        try{
            System.debug('Opportunity--->>'+oppC);
            
            if(oppC != null){
                oppC.CloseDate= System.Today() + 30;
                oppC.StageName= 'Prospecting';
                oppC.AccountId= '0017F000009g43c';
                insert oppC;
                returnResult= oppC.id;
            }
            
        } catch (Exception ex){
             returnResult='Exception--->'+ex;
        }
      return returnResult;
    }

}