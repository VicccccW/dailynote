/* eslint-disable no-console */
import { LightningElement, api, track } from 'lwc';

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
        //this.classList.add('dragElem');
    }

    handleDragOver(evt) {
        if(evt.preventDefault) {
            evt.preventDefault();
        }

        evt.dataTransfer.effectAllowed = 'move';
    }

    handleDragEnter(evt) {
        if(evt.preventDefault) {
            evt.preventDefault();
        }

        //this.classList.add('over');

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

            // console.log(dropItem.Id);
                    
            //  console.log("in child drop");
            //  console.log(event.detail.oldIndex);
            //  console.log(event.detail.newIndex);
            //console.log("event");
           // console.log(event.detail.oldIndex);
            this.dispatchEvent(event);
        }
    }
}