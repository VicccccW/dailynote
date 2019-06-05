public with sharing class WorklogController {

    @AuraEnabled(cacheable=true)
    public static List<Worklog__c> getWorklogList() {
        return [SELECT Id, Name, Date__c, Type__c, Summary__c, Log_Detail__c FROM Worklog__c LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static List<Worklog__c> findWorklogs(String searchKey) {
        if (String.isBlank(searchKey)) {
            return new List<Worklog__c>();
        }
        String key = '%' + searchKey + '%';
        return [SELECT Id, Name, Date__c, Type__c, Summary__c, Log_Detail__c FROM Worklog__c WHERE Summary__c LIKE :key  LIMIT 10];
    }

}