/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

export default class WorklogListItemBubbling extends LightningElement {
    @api worklog;

    handleSelect(event) {
        console.log("in bubbling cmp select");
        // 1. Prevent default behavior of anchor tag click which is to navigate to the href url
        event.preventDefault();
        // 2. Create a custom event that bubbles. Read about event best practices at http://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.events_best_practices
        // the parent worklogList cmp will proces the worklogselect event
        const selectEvent = new CustomEvent('worklogselect', {
            bubbles: true
        });
        // 3. Fire the custom event
        this.dispatchEvent(selectEvent);
    }
}