import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { fireEvent } from 'c/pubsub';

import TYPE_FIELD from '@salesforce/schema/Worklog__c.Type__c';
import DATE_FIELD from '@salesforce/schema/Worklog__c.Date__c';
import SUMMARY_FIELD from '@salesforce/schema/Worklog__c.Summary__c';
import DETAIL_FIELD from '@salesforce/schema/Worklog__c.Log_Detail__c';

export default class RecordFormCreate extends LightningElement {

    @wire(CurrentPageReference) pageRef;


    objectApiName = "Worklog__c";

    fields = [TYPE_FIELD, DATE_FIELD, SUMMARY_FIELD, DETAIL_FIELD];

    handleSuccess(event) {
        const successEvt = new ShowToastEvent({
            title: "Worklog created",
            message: "Record ID: "+ event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(successEvt);

        fireEvent(this.pageRef, 'recordFromSuccess', event.target.value);
    }
}
