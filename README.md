# SFDX App

## Component Structure

## Deployment Issue

### Profile Issue

> You may not modify the permission xxx while editing a Standard Profile  

toggle the following in Admin.profile to true/false if needed

* _CreateContentSpace_  
* _ViewFlowUsageAndFlowEventData_  
* _ViewUserPII_  

## Notes

> "s1EncryptedStoragePref2": false  
_disables Lightning Experience caching_  

_Disabling secure and persistent browser caching has a significant negative performance impact on Lightning Experience. Always enable the setting in production orgs._

## Scratch Org Push Commands  

retrieve sample data from org  
> `sfdx force:data:tree:export --targetusername xxx --outputdir assets/data --query "SELECT Id, Type__c, Date__c, Summary__c, Log_Detail__c FROM Worklog__c"`  

assign permissionset  
> `sfdx force:user:permset:assign --permsetname Worklog_App_Permission`  

or  

> `sfdx force:user:permset:assign -n Worklog_App_Permission -u xxxOrg`  

import sample data to org  
> `sfdx force:data:tree:import -f assets/data/Worklog__c.json`  

open the app directly  
> `sfdx force:org:open -p lightning/page/home`  

create a package in the Devhub, not the scratch org  
> `sfdx force:package:create -n "Worklog App" -d "An app for you to log daily work" -r "force-app" -t Unlocked -v DevHubDailyNote`  

create package version  
> `sfdx force:package:version:create -p "Worklog App" -d force-app -k test1234 --wait 10 -v DevHubDailyNote`  

create scratch org  
> `sfdx force:org:create -s -f config/project-scratch-def.json -a worklogDeploy`  

install package version to scratch, make sure are in right org  
> `sfdx force:package:install --wait 10 --publishwait 10 --package "Worklog App@1.0.0-2" -k test1234 --noprompt`  

install package version to a specfic org  
> `sfdx force:package:install -u xxxOrg --wait 10 --publishwait 10 --package "Worklog App@1.2.0-1" -k test1234 --noprompt`  
