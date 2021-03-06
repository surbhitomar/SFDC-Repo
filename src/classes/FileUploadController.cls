/*
 * SalesforceCodex.com
 * File Upload using Lightning Component
 */

public class FileUploadController {
    @AuraEnabled
    public static Id saveFile(Id parentId, String fileName, String base64Data, String contentType, String fileId) {
        // check if fileId id ''(Always blank in first chunk), then call the saveTheFile method,
        //  which is save the check data and return the attachemnt Id after insert,
        //  next time (in else) we are call the appentTOFile() method
        //   for update the attachment with remains chunks
        system.debug(parentId+'--fileName-->>'+fileName);
        system.debug('length-->'+base64Data.length());
        
        if (fileId == '') {
            fileId = saveTheFile(parentId, fileName, base64Data, contentType);
        } else {
            appendToFile(fileId, base64Data);
        }
        
        return Id.valueOf(fileId);
    }
    
    public static Id saveTheFile(Id parentId, String fileName, String base64Data, String contentType) {
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        
        Attachment oAttachment = new Attachment();
        oAttachment.parentId = parentId;
        
        oAttachment.Body = EncodingUtil.base64Decode(base64Data);
        oAttachment.Name = fileName + '1';
        oAttachment.ContentType = contentType;
        
        insert oAttachment;        
        return oAttachment.Id;
    }
    
    private static void appendToFile(Id fileId, String base64Data) {
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');        
        Attachment a = [SELECT Id, Body,Name FROM Attachment WHERE Id = : fileId];
        
        //String existingBody = EncodingUtil.base64Encode(a.Body);  
        String Name = a.Name + '1';
        a.Name = Name;
        a.Body = EncodingUtil.base64Decode(EncodingUtil.base64Encode(a.Body) + base64Data);        
        update a;
    }
}