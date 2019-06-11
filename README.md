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

_retrieve sample data from org_

> sfdx force:user:permset:assign --permsetname Worklog_App_Permission

> sfdx force:user:permset:assign -n Worklog_App_Permission -u xxxOrg

_assign permissionset_

> sfdx force:data:tree:import -f assets/data/Worklog__c.json

_import sample data to org_

> sfdx force:org:open -p lightning/page/home

_open the app directly_

> sfdx force:package:create -n "Worklog App" -d "An app for you to log daily work" -r "force-app" -t Unlocked -v DevHubDailyNote

_create a package in the Devhub, not the scratch org_

> sfdx force:package:version:create -p "Worklog App" -d force-app -k test1234 --wait 10 -v DevHubDailyNote

_create package version_

> sfdx force:org:create -s -f config/project-scratch-def.json -a worklogDeploy

_create scratch org_

> sfdx force:package:install --wait 10 --publishwait 10 --package "Worklog App@1.0.0-2" -k test1234 --noprompt

_install package version to scratch, make sure are in right org_

> sfdx force:package:install -u xxxOrg --wait 10 --publishwait 10 --package "Worklog App@1.2.0-1" -k test1234 --noprompt

_install package version to a specfic org_