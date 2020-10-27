public with sharing class OpportunityEditForm_Ctrl {
    private static Map<String, Schema.FieldSet> fieldSetMap;
    @AuraEnabled
    public static FieldSetForm getForm(Id recordId, String objectName, String fieldSetName) {
        getObjectFieldSets(objectName);
        FieldSetForm form = new FieldSetForm();
        form.products = [SELECT Id, Product2.Name, Quantity, UnitPrice, ServiceDate, Description 
                           FROM OpportunityLineItem WHERE OpportunityId =: recordId];
        
        system.debug('===fieldSetName===='+fieldSetName);
        if(!String.isBlank(fieldSetName)){
            form.fields.addAll(getFields(fieldSetName));
        }
        return form;
    }
    
    private static void getObjectFieldSets(String objectName){
        Schema.SObjectType objectType = Schema.getGlobalDescribe().get(objectName);
        Schema.DescribeSObjectResult objectDescribe = objectType.getDescribe();
        fieldSetMap = objectDescribe.fieldSets.getMap();
    }
    
    
    private static List<Field> getFields( String fieldSetName) {
        Schema.FieldSet fieldSet = fieldSetMap.get(fieldSetName);
        List<Schema.FieldSetMember> fieldSetMembers = fieldSet.getFields();
        
        List<Field> fields = new List<Field>();
        for (Schema.FieldSetMember fsm : fieldSetMembers) {
            Field f = new Field(fsm);
            fields.add(f);
        }
        return fields;
    }
    
    public class FieldSetForm {
        @AuraEnabled public List<Field> fields;
        @AuraEnabled public List<OpportunityLineItem> products;
        public FieldSetForm() {
            fields = new List<Field>();
            products = new List<OpportunityLineItem>();
        }
    }
    public class Field {
        @AuraEnabled public Boolean DBRequired;
        @AuraEnabled public String APIName;
        @AuraEnabled public String Label;        
        @AuraEnabled public Boolean Required;
        @AuraEnabled public String Type;
        
        public Field(Schema.FieldSetMember f) {
            this.DBRequired = f.DBRequired;
            this.APIName = f.fieldPath;
            this.Label = f.label;
            this.Required = f.required;
            this.Type = String.valueOf(f.getType());
        }
        
        public Field(Boolean DBRequired) {
            this.DBRequired = DBRequired;
        }
    }
}