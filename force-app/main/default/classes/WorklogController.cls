public with sharing class WorklogController {

    // @AuraEnabled(cacheable=true)
    // public static List<Worklog__c> getWorklogList() {
    //     return [SELECT Id, Name, Date__c, Type__c, Summary__c, Log_Detail__c FROM Worklog__c LIMIT 10];
    // }

    @AuraEnabled(cacheable=true)
    public static List<Worklog__c> findWorklogs(String searchKey) {
        if (String.isBlank(searchKey)) {
            //return new List<Worklog__c>();
            return [SELECT Id, Name, Date__c, Type__c, Summary__c, Log_Detail__c FROM Worklog__c LIMIT 10];
        }
        String key = '%' + searchKey + '%';
        return [SELECT Id, Name, Date__c, Type__c, Summary__c, Log_Detail__c FROM Worklog__c WHERE Summary__c LIKE :key  LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static List<Worklog__c> getAllWorklogs() {
        return [SELECT Id, Name, Date__c, Type__c, Summary__c, Log_Detail__c, Drag_Table_Index__c FROM Worklog__c ORDER BY Drag_Table_Index__c ASC];
        //return [SELECT Id, Name, Drag_Table_Index__c FROM Worklog__c ORDER BY Drag_Table_Index__c ASC];
    }

    @AuraEnabled(cacheable=true)
    public static string saveWorklogs(List<>){
        
    }

}