public class DynamicInputFormCtrl {

    @AuraEnabled
    public static Map<String,Object> fetchFieldsInfo(String objApiName, String fieldSetName) {
        Map<String,Object> contrlRes = new Map<String,Object>{
        	'fields' => null
        };
        List<FieldsInfo> fldsInfoLst = new List<FieldsInfo>();        
        for(Schema.FieldSetMember fsm : Schema.getGlobalDescribe().get(objApiName).getDescribe().FieldSets.getMap().get(fieldSetName).getFields()) {
            fldsInfoLst.add(new FieldsInfo(fsm.getLabel(),fsm.getFieldPath(),fsm.getType().Name()));
          }
        contrlRes.put('fields',fldsInfoLst);
        system.debug('**'+getObjInstances(objApiName));
        contrlRes.put('records',getObjInstances(objApiName));
        return contrlRes;
    }
    
    public static List<Sobject> getObjInstances(String objApiName) {
        return new List<Sobject>{Schema.getGlobalDescribe().get(objApiName).newSObject(),Schema.getGlobalDescribe().get(objApiName).newSObject()};
    }
    
    @AuraEnabled
    public static String saveForm(String records) {
        system.debug('entering save...');
        try {
        	insert convertJsonToSobjectLst(records);
        }
        catch(Exception e) {
            system.debug('Exception: '+e.getMessage());
        }
        return null;
    }
    
    public static List<Sobject> convertJsonToSobjectLst(String json) {
		List<object> objects = (List<object>)System.JSON.deserializeUntyped(json);
		
		List<SObject> sobjRecordsLst = new List<SObject>();
		for (Object obj : objects) {
			Map<String, Object> m = (Map<String, Object>)obj;
			String key = (String)m.get('SobjectType');
			key = key.toLowerCase();
			Schema.SObjectType targetType = Schema.getGlobalDescribe().get(key);
			SObject sObj = targetType.newSObject();
			Map<String, Schema.SObjectField> fields = targetType.getDescribe().fields.getMap();
			for (String fieldName : m.keySet()) {
				// Filter out any psuedo fields such as LastNameLocal
				Schema.SObjectField fld = fields.get(fieldName);
				if (fld != null) {
					if (fld.getDescribe().isCreateable() && fld.getDescribe().isUpdateable()) {
						sObj.put(fieldName, m.get(fieldName)); 
					}
				}
			}
			sobjRecordsLst.add(sObj);
		}   
		return sobjRecordsLst;
	}
	public class FieldsInfo {
        @AuraEnabled
        public String label, apiName, dataType;
        public FieldsInfo(String label, String apiName, String dataType) {
            this.label = label;
            this.apiName = apiName;
            this.dataType = dataType;
        }
    }
}