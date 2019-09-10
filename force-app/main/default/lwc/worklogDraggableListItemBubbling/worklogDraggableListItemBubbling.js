/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

export default class WorklogDraggableListItemBubbling extends LightningElement {
    
    @api worklog;

    handleDragStart(evt) {
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('worklog', JSON.stringify(this.worklog));
    }

    handleDragEnter(evt) {
        evt.preventDefault();
    }

    handleDragOver(evt) {
        evt.preventDefault();

        this.template.querySelector('div').classList.add('hovered');

        evt.dataTransfer.effectAllowed = 'move';
    }

    handleDragLeave(evt) {
        this.template.querySelector('div').classList.remove('hovered');
    }

    handleDrop(evt) {
        evt.preventDefault();

        this.template.querySelector('div').classList.remove('hovered');

        const dropItem = JSON.parse(evt.dataTransfer.getData('worklog'));

        if(this.worklog.Id !== dropItem.Id) {
            const event = new CustomEvent('itemdrop', {
                bubbles: true,

                detail: {
                    oldIndex: dropItem.Drag_Table_Index__c,
                    newIndex: this.worklog.Drag_Table_Index__c,
                    oldRelatedListIndex: dropItem.Drag_Related_List_Index__c,
                    newRelatedListIndex: this.worklog.Drag_Related_List_Index__c
                }
            });

            this.dispatchEvent(event);
        }
    }

    handleSelect(evt) {
        evt.preventDefault();

        const event = new CustomEvent('select', {
            bubbles: true
        });

        this.dispatchEvent(event);
    }
}