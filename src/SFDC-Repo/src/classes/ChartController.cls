public class ChartController {
/*
      @AuraEnabled
    // Method to get the picklist values from Schema
    public static List < String > retrivepicklistvalues(string selectedObject,String X_AxisField,String Y_AxisField) {
       
        String selectedfield= X_AxisField;
        system.debug('retrivepicklistvalues calling--selectedObject-->>'+selectedObject);
        system.debug('retrivepicklistvalues calling--selectedfield-->>'+selectedfield);
       
        Map <String, Schema.SObjectType > schemaMap = Schema.getGlobalDescribe(); // descibe sobjects    
        Map <String, string > Mapofpicklist = new Map < string, string > (); // new map for holding the picklist field values
        List <String > options = new List < String > (); //new list for holding all of the picklist options
        
        Schema.sObjectType sobjecttype = schemaMap.get(selectedObject);
        system.debug('sobjecttype-->>'+sobjecttype);
        
       
        Schema.DescribeSObjectResult sobjectdescribe = sobjecttype.getDescribe(); //describe the sobject
        system.debug('sobjectdescribe-->>'+sobjectdescribe);
        Map < String, Schema.SObjectField > fieldmap = sobjectdescribe.fields.getMap();
        system.debug('fieldmap-->>'+fieldmap);
        
        Schema.SObjectField field = fieldmap.get(selectedfield);
        Schema.DisplayType FieldType = field.getDescribe().getType();
        system.debug('--FieldType-->>'+FieldType);
        
        if(FieldType == Schema.DisplayType.Picklist )
        {
            List < Schema.PicklistEntry > picklistvalues = fieldmap.get(selectedfield).getDescribe().getPickListValues(); //get the list of picklist values from field on the sobject
            system.debug('picklistvalues-->>'+picklistvalues);
            for (Schema.PicklistEntry a: picklistvalues) { //for all values in the picklist list
                Mapofpicklist.put(a.getValue(), a.getLabel());
            }
        }else{
            
        }
        for (string picklistapinames: Mapofpicklist.keyset()) {
            options.add(picklistapinames);
        }
        return options; //return the List of values
    }


    // Method to query the data from SObject
    @AuraEnabled
    public static List<wrapperclass> generateDataa(String selectedObject, String X_AxisField,String Y_AxisField) {
        
        String selectedfield= X_AxisField;
        system.debug('generateDataa calling--selectedObject-->>'+selectedObject);
        system.debug('generateDataa calling--selectedfield-->>'+selectedfield);
      
        
        String QueryStr = queryAllFrom(selectedObject); 
        List<Sobject> groupedResults = Database.query(QueryStr); // Retrive the records from selected object
        List<wrapperclass> lstofwrapperclass = new List<wrapperclass> (); // Wrapper calss to hold records with selected field value 
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe(); // Describing the SObjects
        Map<string, string> Mapofpicklist = new Map<string, string> ();
        List<String> options = new List<String> ();
        
        Schema.sObjectType sobjecttype = schemaMap.get(selectedObject); // Get SObject type
        Schema.DescribeSObjectResult sobjectdescribe = sobjecttype.getDescribe(); // Describing the selected SObjects
        Map<String, Schema.SObjectField> fieldmap = sobjectdescribe.fields.getMap(); // Holding SObject fields
        for (Sobject sobj: groupedResults) {
            for (Schema.SObjectField field: fieldMap.values()) {
                if (string.valueof(field) == selectedfield) { // Checking the selected field 
                    Schema.DescribeFieldResult fieldResult = field.getDescribe();
                    wrapperclass wrap = new wrapperclass();
                    wrap.selectedfield = String.valueof(sobj.get(fieldResult.getName())); // Assigning the selected field value of a record
                    wrap.lstofobj = sobj; // Assigning selected SObject record
                    lstofwrapperclass.add(wrap);
                }
            }
        }
        return lstofwrapperclass; // return the wrapper with records and selected field value
    }

    // Wrapper calss to hold the record with selected picklist value
    public class wrapperclass {
        @AuraEnabled
        public string selectedfield;
        @AuraEnabled
        public Sobject lstofobj;
        
    }

    // Dynamic SOQL 
    public static string queryAllFrom(string sObjectType) {
        String query = 'SELECT ';
        for (Schema.SObjectField nameAPIfield: Schema.getGlobalDescribe().get(sObjectType).getDescribe().fields.getMap().values()) {
            query += query == 'SELECT ' ? String.ValueOf(nameAPIfield) : ', ' + String.ValueOf(nameAPIfield);
        }
        return query + ' FROM ' + sObjectType;
    }
//New
    // Method to get the picklist values from Schema
    @AuraEnabled
    public static Map<String,Decimal> mapOfValues(String selectedObject,String X_AxisField,String Y_AxisField,String SummarizeType)
    {
       
        Map<String, Decimal> mapToReturn= new Map<String, Decimal>();
      
        system.debug(SummarizeType+'-SummarizeType---mapOfValues calling--selectedObject-->>'+selectedObject);
        system.debug('--X_AxisField-->>'+X_AxisField);
        system.debug('--X_AxisField-->>'+Y_AxisField);
        
        Map <String, Schema.SObjectType > schemaMap = Schema.getGlobalDescribe(); // descibe sobjects    
        Map <String, string > X_Mapofpicklist = new Map < string, string > (); // new map for holding the picklist field values
         Map <String, string > Y_Mapofpicklist = new Map < string, string > ();
        List <String > options = new List < String > (); //new list for holding all of the picklist options
        
        Schema.sObjectType sobjecttype = schemaMap.get(selectedObject);
        system.debug('sobjecttype-->>'+sobjecttype);
        
       
        Schema.DescribeSObjectResult sobjectdescribe = sobjecttype.getDescribe(); //describe the sobject
        system.debug('sobjectdescribe-->>'+sobjectdescribe);
        Map < String, Schema.SObjectField > fieldmap = sobjectdescribe.fields.getMap();
        system.debug('fieldmap-->>'+fieldmap);
        /*
        Schema.SObjectField X_AxisFieldTemp;
        Schema.DisplayType X_AxisFieldType;
        Schema.SObjectField Y_AxisFieldTemp;
        Schema.DisplayType Y_AxisFieldType;
        if(X_AxisField != 'Count')
        {
            X_AxisFieldTemp = fieldmap.get(X_AxisField);
            X_AxisFieldType = X_AxisFieldTemp.getDescribe().getType();
            system.debug('--X_AxisFieldType-->>'+X_AxisFieldType);
        }
        if(Y_AxisField != 'Count')
        {
            Y_AxisFieldTemp = fieldmap.get(Y_AxisField);
            Y_AxisFieldType = Y_AxisFieldTemp.getDescribe().getType();
            system.debug('--Y_AxisFieldType-->>'+Y_AxisFieldType);
        }
        
        if((X_AxisField != 'Count' && X_AxisFieldType == Schema.DisplayType.Picklist))
        {
              List < Schema.PicklistEntry > picklistvalues = fieldmap.get(X_AxisField).getDescribe().getPickListValues(); //get the list of picklist values from field on the sobject
              system.debug('picklistvalues-->>'+picklistvalues);
              for (Schema.PicklistEntry a: picklistvalues) { //for all values in the picklist list
              X_Mapofpicklist.put(a.getValue(), a.getLabel());
             } 
            
        }
        if((Y_AxisField != 'Count' && Y_AxisFieldType == Schema.DisplayType.Picklist))
        {
                List < Schema.PicklistEntry > picklistvalues = fieldmap.get(Y_AxisField).getDescribe().getPickListValues(); //get the list of picklist values from field on the sobject
                system.debug('picklistvalues-->>'+picklistvalues);
                for (Schema.PicklistEntry a: picklistvalues) { //for all values in the picklist list
                Y_Mapofpicklist.put(a.getValue(), a.getLabel());
               } 
        }           
        
       */
       /*
   try{ 
       
       //String query1 = 'SELECT '+ X_AxisField+','+ Y_AxisField +' FROM ' + selectedObject; 
        
       String QueryStr = queryAllFrom(selectedObject); 
       List<Sobject> groupedResults = Database.query(QueryStr); // Retrive the records from selected object
       system.debug('-groupedResults--->>'+groupedResults);
       
       Decimal count= 1;       
       Map<String,Decimal> MapForTotalCount= new Map<String,Decimal>();
       Map<String,Decimal> MapForSUM= new Map<String,Decimal>();
       Map<String,Decimal> MapForAverage= new Map<String,Decimal>();
        
      for (Sobject sobj: groupedResults)
      {
         
         if(MapForSUM.containsKey((String) sobj.get(X_AxisField)))
         {                  
           MapForSUM.put((String) sobj.get(X_AxisField),((Decimal) sobj.get(Y_AxisField)+MapForSUM.get((String) sobj.get(X_AxisField))));
                   
         }else{
            
           if((String) sobj.get(X_AxisField) != 'null' && (String) sobj.get(X_AxisField) != null)
           {
           MapForSUM.put((String) sobj.get(X_AxisField),(Decimal) sobj.get(Y_AxisField));
           }
         }
         if(MapForTotalCount.containsKey((String) sobj.get(X_AxisField)))
         {
            //system.debug((String) sobj.get(X_AxisField)+'--MapForTotalCount Contains--'+count+MapForTotalCount.get((String) sobj.get(X_AxisField)));
            MapForTotalCount.put((String) sobj.get(X_AxisField),(count+MapForTotalCount.get((String) sobj.get(X_AxisField))));                
               
         }else{
            if((String) sobj.get(X_AxisField) != 'null' && (String) sobj.get(X_AxisField) != null)
            {
            MapForTotalCount.put((String) sobj.get(X_AxisField),count); 
            }
         }
         if(MapForAverage.containsKey((String) sobj.get(X_AxisField)))
         {
           MapForAverage.put((String) sobj.get(X_AxisField), ((Decimal) sobj.get(Y_AxisField)/MapForTotalCount.get((String) sobj.get(X_AxisField))).round());        
         }else{
           if((String) sobj.get(X_AxisField) != 'null' && (String) sobj.get(X_AxisField) != null)
           {
           MapForAverage.put((String) sobj.get(X_AxisField), (Decimal) sobj.get(Y_AxisField));
           }
         }

      }
      system.debug('--MapForSUM-->>'+MapForSUM);
      system.debug('--MapForTotalCount-->>'+MapForTotalCount);
      system.debug('--MapForAverage-->>'+MapForAverage);
      if(SummarizeType == 'Sum')
      {
         mapToReturn.putAll(MapForSUM);
            
       }else if(SummarizeType == 'Count')
       {
         mapToReturn.putAll(MapForTotalCount);
            
       }else if(SummarizeType == 'Average')
       {
         mapToReturn.putAll(MapForAverage);
       }
   }catch(Exception e)
   {
       system.debug(e.getLineNumber()+'--Exception--->>'+e.getMessage());
   }
        //system.debug('--Y_Mapofpicklist-->>'+Y_Mapofpicklist);
        //system.debug('--X_Mapofpicklist-->>'+X_Mapofpicklist);
        system.debug('--mapToReturn-->>'+mapToReturn);
        return mapToReturn; //return the Map of values
    }
    
  
   //------------------------------------------------------ 2 -------------- 
     @auraEnabled
    public List<LineChartVar> myLineChartVarList;
    
    public class LineChartVar {
        string label;
        integer firstValue;
        integer secondValue;       
        
        public LineChartVar(string a, integer b, integer c){
            label = a;
            firstValue = b;
            secondValue = c;
        } 
    }
    
    @auraEnabled
    public static Map<string, integer> getChartMap(){
        Map<string, integer> mp = new Map<string, integer>();        
        mp.put('Jan', 45);
        mp.put('Feb', 50);
        mp.put('Mar', 30);
        mp.put('Apr', 36);
        mp.put('May', 42);
        mp.put('Jun', 39);
        mp.put('Jul', 41);
        mp.put('Aug', 36);
        mp.put('Sep', 43);
        mp.put('Oct', 45);
        mp.put('Nov', 33);
        mp.put('Dec', 53);
        
        return mp;
    }
    
    @auraEnabled
    public static string getLineChartMap(){
        List<LineChartVar> myLineChartVarList = new List<LineChartVar>();
        
        myLineChartVarList.add(new LineChartVar('2010', 10, 12));
        myLineChartVarList.add(new LineChartVar('2011', 12, 15));
        myLineChartVarList.add(new LineChartVar('2012', 17, 19));
        myLineChartVarList.add(new LineChartVar('2013', 19, 17));
        myLineChartVarList.add(new LineChartVar('2014', 21, 15));
        myLineChartVarList.add(new LineChartVar('2015', 17, 20));
        myLineChartVarList.add(new LineChartVar('2016', 18, 16));        
        return JSON.Serialize(myLineChartVarList);
    }
    */
    
   // 1----PS 
    /*@AuraEnabled
    public static String getOpportunityJSON(){
        
       List<opportunity> lstopp = [SELECT Id, stagename FROM opportunity ];
        Map<String,Integer> mapLeadSource = new Map<String,Integer>();
        
        for(opportunity l : lstopp)
        {
            if(mapLeadSource.containsKey(l.stagename))
            {
                mapLeadSource.put(l.stagename, mapLeadSource.get(l.stagename)+1) ;
            }else{
                mapLeadSource.put(l.stagename, 0) ;        
            }
        }
        system.debug('map values--'+mapLeadSource);
        list<ChartDataWrapper> chartData = new list<ChartDataWrapper>();
        
        for(String key : mapLeadSource.keySet())
        {            
           ChartDataWrapper rdw = new ChartDataWrapper();
            rdw.name=key;
            rdw.y=mapLeadSource.get(key);
            chartData.add(rdw);
        }
        system.debug('rdw---'+chartData);
        return System.json.serialize(chartData);
        //return null;
    }
    
   
    class ChartDataWrapper+
    {
       @AuraEnabled
       public String name;
       @AuraEnabled
       public integer y;
      
    }
    
    */

}