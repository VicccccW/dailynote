/* eslint-disable no-console */
import { LightningElement, wire, track} from 'lwc';
//import { CurrentPageReference } from 'lightning/navigation';
import getAllWorklogs from '@salesforce/apex/WorklogController.getAllWorklogs';
//import { fireEvent } from 'c/pubsub';

export default class WorklogDraggableList extends LightningElement {
    //@wire(CurrentPageReference) pageRef;
    
    @wire(getAllWorklogs) worklogs;

    //@track worklogs = [];
    @track error;

    //dragSourceElement = null;

    // @wire(getAllWorklogs)
    // wiredWorklogs({ error, data }) {
    //     if(data) {
    //         this.worklogs = data;
    //         this.error = undefined;
    //         console.log("data is ");
    //         console.log(data);
    //     } else if (error) {
    //         this.worklogs = undefined;
    //         this.error = error;
    //         console.log(error);
    //     }
    // }

}