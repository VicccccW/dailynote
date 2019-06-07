/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

export default class WorklogDraggableListItemBubbling extends LightningElement {
    @api worklog;

    itemDragStart() {
        const event = new CustomEvent('itemdrag', {
            detail: this.worklog.Drag_Table_Index__c
        });
        console.log("dragged");
        this.dispatchEvent(event);
        console.log("dragged");
    }
}