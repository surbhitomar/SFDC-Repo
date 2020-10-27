<aura:application extends="force:slds">
    <!-- c:testWrapper/ -->
<!-- here c: is org. default namespace prefix-->
    <!-- c:InterfacesExampes / -->
    <!-- c:CmpA_Parent -->
    <!-- c:componentEventReceiver/ -->
    <!-- c:customLookup / -->
     <!-- Create attribute to store lookup value as a sObject--> 
  <!--aura:attribute name="selectedLookUpRecords" type="sObject[]" default="[]"/>
 
  <c:reUsableMultiSelectLookup objectAPIName="account"
                               IconName="standard:account"
                               lstSelectedRecords="{!v.selectedLookUpRecords}"
                               label="Account Name"/ -->
   <!-- here c: is org. namespace prefix-->
</aura:application>