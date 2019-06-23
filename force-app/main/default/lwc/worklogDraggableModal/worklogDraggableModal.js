import { LightningElement, track } from 'lwc';

export default class WorklogDraggableModal extends LightningElement {
    @track showModal = false;
 
    /* javaScipt functions start */ 
    openModal() {    
        // to open modal window set 'showModal' tarck value as true
        this.showModal = true;
    }
 
    closeModal() {    
        // to close modal window set 'showModal' tarck value as false
        this.showModal = false;
    }
    /* javaScipt functions end */ 
}



