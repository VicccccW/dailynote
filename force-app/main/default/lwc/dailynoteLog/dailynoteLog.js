import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import TYPE_FIELD from '@salesforce/schema/Worklog__c.Type__c';
import DATE_FIELD from '@salesforce/schema/Worklog__c.Date__c';
import SUMMARY_FIELD from '@salesforce/schema/Worklog__c.Summary__c';
import DETAIL_FIELD from '@salesforce/schema/Worklog__c.Log_Detail__c';

export default class RecordFormCreate extends LightningElement {
    // objectApiName is "Account" when this component is placed on an account record page
    @api objectApiName;

    fields = [TYPE_FIELD, DATE_FIELD, SUMMARY_FIELD, DETAIL_FIELD];

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: "+ event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }
}
