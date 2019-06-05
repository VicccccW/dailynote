/* eslint-disable no-console */
/**
 * The pubsub communication approach is used to provide a communication mechanism between sibling components assembled in a flexipage (App Builder) where traditional parent/child communication patterns are not available.
 * Do NOT use this utility for parent/child communication. Use the guidelines below instead.
 * For child-to-parent communication, fire a DOM event in the child component
 * For parent-to-child communication, use property passing or call a public @api method defined in the child component
 */
import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import findWorklogs from '@salesforce/apex/WorklogController.findWorklogs';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';

export default class WorklogList extends LightningElement {
    searchKey;

    @wire(CurrentPageReference) pageRef;

    @wire(findWorklogs, { searchKey: '$searchKey' })
    worklogs;

    //listen to the events ('searcKeyChange') using the life cycle callback
    //use this.handleSearchKeyChange as a handler to handle the event received
    //the event pass a string as a parameter, so handleSearchKeyChange takes this parameter
    connectedCallback() {
        // subscribe to searchKeyChange event
        registerListener('searchKeyChange', this.handleSearchKeyChange, this);
    }

    disconnectedCallback() {
        // unsubscribe from searchKeyChange event
        unregisterAllListeners(this);
    }

    //when receives the event, get the passed parameter, then set the searchKey
    //it will then trigger the @wire(findWorklogs) and passin the parameter.
    //the returned data is a worklogs promise
    //consume the promise in html
    handleSearchKeyChange(searchKey) {
        console.log("received key is " + searchKey);
        this.searchKey = searchKey;
    }

    //whenever an item is selected in the list, fire an event called 'worklogSelected' and pass the id
    //worklogDetail cmp will subscribe and receive the passed id
    handleWorklogSelect(event) {
        // fire worklogSelected event
        fireEvent(this.pageRef, 'worklogSelected', event.target.worklog.Id);
    }
}