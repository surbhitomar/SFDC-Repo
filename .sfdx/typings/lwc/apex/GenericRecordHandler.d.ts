declare module "@salesforce/apex/GenericRecordHandler.getObjects" {
  export default function getObjects(): Promise<any>;
}
declare module "@salesforce/apex/GenericRecordHandler.getRecords" {
  export default function getRecords(param: {objectName: any}): Promise<any>;
}
