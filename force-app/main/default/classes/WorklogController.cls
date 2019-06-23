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
    public static List<Worklog__c> getChildWorklogs(String accountId) {
        return [SELECT Id
                , Name, Date__c
                , Type__c
                , Summary__c
                , Log_Detail__c
                , Drag_Related_List_Index__c 
                FROM Worklog__c 
                WHERE Account__c =:accountId 
                ORDER BY Drag_Related_List_Index__c 
                ASC];
    }

    @AuraEnabled
    public static void saveWorklogs(String savedWorklogsStr){
        
        List<Worklog__c> worklogs = new List<Worklog__c>();

        worklogs = processWorklogs(savedWorklogsStr);

        update worklogs;
    }

    private static List<Worklog__c> processWorklogs(String savedWorklogsStr) {

        List<Worklog__c> worklogs = new List<Worklog__c>();

        JSONParser parser = JSON.createParser(savedWorklogsStr);

        while(parser.nextToken() != null) {
            if (parser.getCurrentToken() == JSONToken.START_ARRAY) {
                while (parser.nextToken() != null) {
                    if (parser.getCurrentToken() == JSONToken.START_OBJECT) {
                        Worklog__c objVal = new Worklog__c();
                        Worklog__c objTemp = (Worklog__c)parser.readValueAs(Worklog__c.class);
                        //System.debug(objTemp);
                        if(objTemp.Id != null) {
                            objVal.Id = objTemp.Id;

                            if(objTemp.Drag_Table_Index__c != null) {
                                objVal.Drag_Table_Index__c = objTemp.Drag_Table_Index__c;
                            } 
                            
                            if(objTemp.Drag_Related_List_Index__c != null) {
                                objVal.Drag_Related_List_Index__c = objTemp.Drag_Related_List_Index__c;
                            }

                            // objVal.Name = objTemp.Name ;
                            // objVal.Date__c = objTemp.Date__c ;
                            // objVal.Type__c = objTemp.Type__c ;
                            // objVal.Summary__c = objTemp.Summary__c ;
                            // objVal.Log_Detail__c = objTemp.Log_Detail__c ;
                            
                            worklogs.add(objVal);
                        }
                    }
                }
            }
        }

        return worklogs;
    }
}