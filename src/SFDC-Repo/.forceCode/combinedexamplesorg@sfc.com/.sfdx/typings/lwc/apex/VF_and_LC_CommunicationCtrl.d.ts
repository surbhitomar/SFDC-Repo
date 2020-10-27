declare module "@salesforce/apex/VF_and_LC_CommunicationCtrl.sendMailMethod" {
  export default function sendMailMethod(param: {mSubjectC: any, mbodyC: any, caseIdC: any, conSObject: any, templateIdC: any, selectedRecordAdditionalTols: any, selectedRecordCCls: any, selectedRecordBCCls: any}): Promise<any>;
}
declare module "@salesforce/apex/VF_and_LC_CommunicationCtrl.getToAddress" {
  export default function getToAddress(param: {toAddressC: any}): Promise<any>;
}
declare module "@salesforce/apex/VF_and_LC_CommunicationCtrl.getEmailTemplate" {
  export default function getEmailTemplate(param: {templateIdC: any, recordIdC: any}): Promise<any>;
}
