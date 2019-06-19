/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

export default class WorklogDraggableListItemBubbling extends LightningElement {
    
    //@track originWorklog;

    @api worklog;

    // @api
    // get worklog() {
    //     return this._worklog;
    // }

    // set worklog(value) {
    //     this._worklog = value;
    // }

    handleDragStart(evt) {
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('worklog', JSON.stringify(this.worklog));
        this.template.querySelector('div').classList.add('dragElem');
    }

    handleDragOver(evt) {
        if(evt.preventDefault) {
            evt.preventDefault();
        }

        this.template.querySelector('div').classList.add('over');
        evt.dataTransfer.effectAllowed = 'move';
    }

    handleDragEnter(evt) {
        if(evt.preventDefault) {
            evt.preventDefault();
        }

        this.template.querySelector('div').classList.add('over');

    }

    handleDrop(evt) {
        evt.preventDefault();

        const dropItem = JSON.parse(evt.dataTransfer.getData('worklog'));

        if(this.worklog.Id !== dropItem.Id) {
            const event = new CustomEvent('itemdrop', {
                bubbles: true,
                //detail: this.dropItem.Id
                detail: {
                    // Id: dropItem.Id,
                    // Name: dropItem.Name,
                    // Type: dropItem.Type__c,
                    // Date: dropItem.Date__c,
                    // Summary: dropItem.Summary__c,
                    oldIndex: dropItem.Drag_Table_Index__c,
                    newIndex: this.worklog.Drag_Table_Index__c
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