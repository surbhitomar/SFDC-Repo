global class DyamicPicklistValuesInLightningAB extends VisualEditor.DynamicPickList {
   global override VisualEditor.DataRow getDefaultValue(){
       VisualEditor.DataRow defaultValue = new VisualEditor.DataRow('None', 'None');
       return defaultValue;
   }
   global override VisualEditor.DynamicPickListRows getValues() {
	VisualEditor.DataRow defaultValue = getDefaultValue();
	List<Opportunity> oppList= [select id,name from opportunity];
	VisualEditor.DynamicPickListRows  myValues = new VisualEditor.DynamicPickListRows();
    //oppList.addRow(defaultValue);
    for(Opportunity thisSetting : oppList){
        myValues.addRow(new VisualEditor.DataRow(thisSetting.name , thisSetting.name));
    }

	 /* List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();        
       VisualEditor.DynamicPickListRows  myValues = new VisualEditor.DynamicPickListRows();
       List<Chart_Type__mdt> listOfSetting = new List<Chart_Type__mdt>();
       listOfSetting = ChartController.chartSettingRecords('null');
       
       for(Chart_Type__mdt thisSetting : listOfSetting){
           myValues.addRow(new VisualEditor.DataRow(thisSetting.DeveloperName , thisSetting.DeveloperName));
       }*/
       
       return myValues;
   }
}