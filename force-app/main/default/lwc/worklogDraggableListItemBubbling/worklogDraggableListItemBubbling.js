/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

export default class WorklogDraggableListItemBubbling extends LightningElement {
    @api worklog;

    itemDragStart() {
        const event = new CustomEvent('itemdrag', {
            detail: this.worklog
        });

        this.dispatchEvent(event);
    }
}