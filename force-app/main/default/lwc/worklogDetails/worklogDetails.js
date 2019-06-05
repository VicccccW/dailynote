/**
 * The pubsub communication approach is used to provide a communication mechanism between sibling components assembled in a flexipage (App Builder) where traditional parent/child communication patterns are not available.
 * Do NOT use this utility for parent/child communication. Use the guidelines below instead.
 * For child-to-parent communication, fire a DOM event in the child component
 * For parent-to-child communication, use property passing or call a public @api method defined in the child component
 */
import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { reduceErrors } from 'c/idsUtils';

import NAME_FIELD from '@salesforce/schema/Worklog__c.Name';
import DATE_FIELD from '@salesforce/schema/Worklog__c.Date__c';
import TYPE_FIELD from '@salesforce/schema/Worklog__c.Type__c';
import SUMMARY_FIELD from '@salesforce/schema/Worklog__c.Summary__c';
import DETAIL_FIELD from '@salesforce/schema/Worklog__c.Log_Detail__c';

const fields = [
    NAME_FIELD,
    DATE_FIELD,
    TYPE_FIELD,
    SUMMARY_FIELD,
    DETAIL_FIELD
];

export default class WorklogDetails extends LightningElement {
    recordId;

    @track name;
    @track date;
    @track type;
    @track summary;
    @track detail;

    @wire(CurrentPageReference) pageRef;

    @wire(getRecord, { recordId: '$recordId', fields })
    wiredRecord({ error, data }) {
        if (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading worklog',
                    message: reduceErrors(error).join(', '),
                    variant: 'error'
                })
            );
        } else if (data) {
            this.name = getFieldValue(data, NAME_FIELD);
            this.date = getFieldValue(data, DATE_FIELD);
            this.type = getFieldValue(data, TYPE_FIELD);
            this.summary = getFieldValue(data, SUMMARY_FIELD);
            this.detail = getFieldValue(data, DETAIL_FIELD);
        }
    }

    connectedCallback() {
        registerListener('worklogSelected', this.handleWorklogSelected, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleWorklogSelected(worklogId) {
        this.recordId = worklogId;
    }
}