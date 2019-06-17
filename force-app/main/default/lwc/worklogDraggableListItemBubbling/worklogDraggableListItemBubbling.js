/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

export default class WorklogDraggableListItemBubbling extends LightningElement {
     
    _worklog;

    @api
    get worklog() {
        return this._worklog;
    }

    set worklog(value) {
        this._worklog = value;
    }

    handleDragStart(evt) {
        evt.dataTransfer.setData('worklog', JSON.stringify(this.worklog));
    }

    handleDragOver(evt) {
        if(evt.preventDefault) {
            evt.preventDefault();
        }
    }

    handleDrop(evt) {
        evt.preventDefault();

        const dropItem = JSON.parse(evt.dataTransfer.getData('worklog'));

        if(this.worklog.Id !== dropItem.Id) {
            const event = new CustomEvent('itemdrop', {
                bubbles: true,
                //detail: this.dropItem.Id
                detail: {
                    Id: dropItem.Id,
                    Name: dropItem.Name,
                    Type: dropItem.Type__c,
                    Date: dropItem.Date__c,
                    Summary: dropItem.Summary__c,
                    oldIndex: dropItem.Drag_Table_Index__c,
                    newIndex: this.worklog.Drag_Table_Index__c
                }
            });

            // console.log(dropItem.Id);
                    
            // console.log("droping target id ");
            // console.log(this.worklog.Id);
            
            this.dispatchEvent(event);
        }
    }
}