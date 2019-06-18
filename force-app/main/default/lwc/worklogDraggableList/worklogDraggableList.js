/* eslint-disable no-console */
import { LightningElement, wire, track} from 'lwc';
import getAllWorklogs from '@salesforce/apex/WorklogController.getAllWorklogs';

export default class WorklogDraggableList extends LightningElement {
    
    @track worklogs;
    @track error;

    @wire(getAllWorklogs)
    wiredWorklogs({ error, data }) {
        if(data) {

            // console.log("worklog before assign is ");
            // console.log(this.worklogs);
            this.worklogs = data;
            this.error = undefined;
            //  console.log("data is ");
            // console.log(data);
            // console.log("worklog after assign is ");
            // console.log(this.worklogs);

        } else if (error) {
            this.worklogs = undefined;
            this.error = error;
            //console.log(error);
        }
    }

    handleItemDrop(event) {
    
        console.log("on drop");
        //console.log(this.worklogs);
        // console.log(event.detail.Id);
        // console.log(event.detail.Index);
        //remove indexed old element and get a returned new array 

        //insert new element/ moved element into the new array with newIndex
        //console.log(this.worklogs[event.detail.Index]);

        // console.log("in parent drop");
    //console.log(event.detail.oldIndex);
        // console.log(event.detail.newIndex);

        const movedItem = this.worklogs.find((element, index) => index === event.detail.oldIndex);
        //console.log(movedItem);
        const remainingItems = this.worklogs.filter((element, index) => index !== event.detail.oldIndex);
        //console.log(remainingItems);
        // const reorderedItems = [
        //     ...remainingItems.slice(0, event.detail.newIndex),
        //     movedItem,
        //     ...remainingItems.slice(event.detail.newIndex)
        // ];
        //console.log("dragging " + event.detail.oldIndex + " to " + event.detail.newIndex);

        remainingItems.splice(event.detail.newIndex , 0, movedItem);
        console.log(remainingItems);

        // remainingItems.forEach((element, index) => {
        //     element.Drag_Table_Index__c = index;

        // });

        // remainingItems.sort((a, b) => {
        //     return a.Drag_Table_Index__c - b.Drag_Table_Index__c
        // });

        //change all index

        // reorderedItems.forEach((element) => {
        //     console.log(element);
        //     console.log(element.Drag_Table_Index__c);
        // })
        
        // reorderedItems.forEach(function(element, index) {
        //     //  console.log("before assign");
        //     //  console.log(element);
        //     //element.Drag_Table_Index__c = index;
        //     reorderedItems[index].Drag_Table_Index__c = index;
        //      //console.log(reorderedItems.indexOf(element));
        //     // console.log("after assign");
        //     // console.log(element);
        // });
        //console.log( this.worklogs);
        //console.log(reorderedItems);
        this.worklogs = remainingItems;
        //console.log(this.worklogs);
        //console.log( this.worklogs);
    }
}