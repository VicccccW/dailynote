/* eslint-disable no-console */
import { LightningElement, wire, track} from 'lwc';
import getAllWorklogs from '@salesforce/apex/WorklogController.getAllWorklogs';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class WorklogDraggableList extends LightningElement {
    
    @track worklogs;

    @track error;

    _originalArr;

    @wire(CurrentPageReference) pageRef;

    @wire(getAllWorklogs)
    wiredWorklogs({ error, data }) {
        if(data) {
            this.worklogs = JSON.parse(JSON.stringify(data));
            this._originalArr = JSON.parse(JSON.stringify(data));
            //https://salesforce.stackexchange.com/questions/256761/uncaught-typeerror-set-on-proxy-trap-returned-falsish-for-property-name
            this.error = undefined;
        } else if (error) {
            this.worklogs = undefined;
            this.error = error;
        }
    }

    handleItemDrop(event) {

        const movedItem = this.worklogs.find((element, index) => index === event.detail.oldIndex);

        const remainingItems = this.worklogs.filter((element, index) => index !== event.detail.oldIndex);
        
        //console.log(remainingItems);
        // const reorderedItems = [
        //     ...remainingItems.slice(0, event.detail.newIndex),
        //     movedItem,
        //     ...remainingItems.slice(event.detail.newIndex)
        // ];
        //console.log("dragging " + event.detail.oldIndex + " to " + event.detail.newIndex);

        remainingItems.splice(event.detail.newIndex, 0, movedItem);
        
        remainingItems.forEach((element, index) => {
            element.Drag_Table_Index__c = index;
        });

        remainingItems.sort((a, b) => {
            return a.Drag_Table_Index__c - b.Drag_Table_Index__c
        });

        this.worklogs = remainingItems;
    }

    handleSelect(event) {
        fireEvent(this.pageRef, 'worklogSelected', event.target.worklog.Id);
    }
}