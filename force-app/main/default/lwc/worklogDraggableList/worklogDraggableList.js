/* eslint-disable no-console */
import { LightningElement, wire, track} from 'lwc';
import getAllWorklogs from '@salesforce/apex/WorklogController.getAllWorklogs';

export default class WorklogDraggableList extends LightningElement {
    
    @track worklogs;
    @track error;

    @wire(getAllWorklogs)
    wiredWorklogs({ error, data }) {
        if(data) {
            this.worklogs = data;
            this.error = undefined;
            // console.log("data is ");
            // console.log(data);
        } else if (error) {
            this.worklogs = undefined;
            this.error = error;
            //console.log(error);
        }
    }

    handleItemDrop(event) {
    
        console.log("on drop");
        // console.log(event.detail.Id);
        // console.log(event.detail.Index);
        //remove indexed old element and get a returned new array 

        //insert new element/ moved element into the new array with newIndex
        //console.log(this.worklogs[event.detail.Index]);

        const moveditem = this.worklogs.find((element, index) => index === event.detail.oldIndex);

        const remainingItems = this.worklogs.filter((element, index) => index !== event.detail.oldIndex);

        const reorderedItems = [
            ...remainingItems.slice(0, event.detail.newIndex),
            moveditem,
            ...remainingItems.slice(event.detail.newIndex)
        ];

        this.worklogs = reorderedItems;
    }
}