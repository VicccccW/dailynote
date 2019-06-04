# SFDX App

## Dev, Build and Test

## Resources

## Description of Files and Directories

## Issues

## Notes
>"s1EncryptedStoragePref2": false

_disables Lightning Experience caching_

_Disabling secure and persistent browser caching has a significant negative performance impact on Lightning Experience. Always enable the setting in production orgs._

## Commands
> sfdx force:data:tree:export --targetusername xxx --outputdir assets/data --query "SELECT Id, Type__c, Date__c, Summary__c, Log_Detail__c FROM Worklog__c"