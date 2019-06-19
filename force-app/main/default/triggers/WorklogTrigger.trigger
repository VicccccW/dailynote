trigger WorklogTrigger on SOBJECT (
    before insert,
    before update, 
    before delete, 
    after insert, 
    after update, 
    after delete, 
    after undelete) {
    // // verify if triggers are disabled
    // if(!GlobalUtility.isTriggerDisabled(String.valueOf(Worklog__c.sObjectType))){     
    //     // DuplicateRecordItem handler dispatches appropriate event
    //     WorklogTriggerHandler.execute();  
    // }
    WorklogTriggerHandler.execute();  
}