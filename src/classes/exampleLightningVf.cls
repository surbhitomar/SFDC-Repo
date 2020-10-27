public class exampleLightningVf {
  
    public String pbMode{get; set;}
    public Boolean ligtningMode {get; set;}
     
    public exampleLightningVf(ApexPages.StandardSetController controller) {
     if(UserInfo.getUiThemeDisplayed() == 'Theme3' && Apexpages.currentPage().getParameters().get('beLightning') == null)
     {
         pbMode = 'edit';
         ligtningMode = false;
     }
        else {
            pbMode = 'maindetail';
            ligtningMode = true;
        }
             
    }
}