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
        console.log("start drag");
        evt.dataTransfer.setData('worklog', JSON.stringify(this.worklog));
    }

    handleDragOver(evt) {
        evt.preventDefault();
        console.log("over drag");
    }

    handleDrop(evt) {
        evt.preventDefault();
        console.log("in drop");

        const dropItem = JSON.parse(evt.dataTransfer.getData('worklog'));
        
        console.log("in drop2");
        const event = new CustomEvent('itemdrop', {
            detail: dropItem.Id
        });

        console.log("in drop3");
        console.log(event);
        console.log(event.detail);


        this.dispatchEvent(event);
    }

}