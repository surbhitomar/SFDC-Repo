public with sharing class LightningNClassicView2AccCtrl {

    public Account acct;

    public LightningNClassicView2AccCtrl(ApexPages.StandardController controller) {
    
     this.acct = (Account)controller.getRecord();
     system.debug('--acct--->'+acct);

    }

}