/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';
//import { CurrentPageReference } from 'lightning/navigation';
//import { registerListener, unregisterAllListeners } from 'c/pubsub';

export default class WorklogDraggableModal extends LightningElement {
    @track showModal = false;

    //@wire(CurrentPageReference) pageRef;
 
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

    handleItemDrop() {
        this.template.querySelectorAll('button').forEach(element => {
            element.removeAttribute("disabled");
        });
    }

    handleRevert() {
        //disable button
        this.template.querySelectorAll('button').forEach(element => {
            if(element.name !== "Close") {
                if(element.name !== "Close") {
                    element.setAttribute("disabled", null);
                }
            }
        });

        this.template.querySelector('c-worklog-draggable-modal-page').handleRevert();
    }

    handleSave() {
        //disable button
        this.template.querySelectorAll('button').forEach(element => {
            if(element.name !== "Close") {
                element.setAttribute("disabled", null);
            }
        });

        this.template.querySelector('c-worklog-draggable-modal-page').handleSave().then(() => this.closeModal());
        
        // // eslint-disable-next-line @lwc/lwc/no-async-operation
        // setTimeout(() => {
        //     this.showModal = false;
        // }, 1000);
        
    }

    // connectedCallback() {

    // }

    // renderedCallback() {

    // }
}



