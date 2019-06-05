public with sharing class WorklogController {

    @AuraEnabled(cacheable=true)
    public static List<Worklog__c> getWorklogList() {
        return [SELECT Id, Name, Date__c, Type__c, Summary__c, Log_Detail__c FROM Worklog__c LIMIT 10];
    }

}