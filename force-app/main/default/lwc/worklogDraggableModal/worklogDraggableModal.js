/* eslint-disable no-console */
import { LightningElement, track, api } from 'lwc';

export default class WorklogDraggableModal extends LightningElement {
    @track showModal = false;

    @api recordId;
 
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
            if(element.name !== "Close") {
                element.removeAttribute("disabled");
            }
        });
    }

    handleRevert() {
        //disable button
        this.template.querySelectorAll('button').forEach(element => {
            if(element.name !== "Close") {
                element.setAttribute("disabled", null);
            }
        });

        this.template.querySelector('c-worklog-draggable-modal-page')
        .handleRevert();
    }

    handleSave() {
        //disable button
        this.template.querySelectorAll('button').forEach(element => {
            if(element.name !== "Close") {
                element.setAttribute("disabled", null);
            }
        });

        this.template.querySelector('c-worklog-draggable-modal-page')
        .handleSave()
        .then(() => this.closeModal());
    }
}



