/* eslint-disable no-console */
import { LightningElement, wire, track} from 'lwc';
import getChildWorklogs from '@salesforce/apex/WorklogController.getChildWorklogs';
import saveWorklogs from '@salesforce/apex/WorklogController.saveWorklogs';
import { reduceErrors } from 'c/idsUtils';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class WorklogDraggableRelatedList extends LightningElement {
    
    @track worklogs;

    @track error;

    _originalArr;

    _curPageUrl;

    _accountId;

    @wire(getChildWorklogs)
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

        const movedItem = this.worklogs.find((element, index) => index === event.detail.oldRelatedListIndex);
        
        const remainingItems = this.worklogs.filter((element, index) => index !== event.detail.oldRelatedListIndex);

        remainingItems.splice(event.detail.newRelatedListIndex, 0, movedItem);

        //change index
        remainingItems.forEach((element, index) => {
            element.Drag_Related_List_Index__c = index;
        });

        //re-order new items based on new index
        remainingItems.sort((a, b) => {
            return a.Drag_Related_List_Index__c - b.Drag_Related_List_Index__c
        });

        //update worklogs property
        this.worklogs = remainingItems;

        //enable buttons 
        this.template.querySelectorAll('button').forEach(element => {
            element.removeAttribute("disabled");
        });
    }

    handleSelect(event) {
        console.log("handle select clicked");
    }

    handleRevert(event) {
        //disable button
        this.template.querySelectorAll('button').forEach(element => {
            element.setAttribute("disabled", null);
        });

        this.worklogs = this._originalArr;
    }

    handleSave(event) {  
        //disable button
        this.template.querySelectorAll('button').forEach(element => {
            element.setAttribute("disabled", null);
        });
        
        //save data to server
        const savedWorklogsStr = JSON.stringify(this.worklogs);

        saveWorklogs({ savedWorklogsStr : savedWorklogsStr })
            .then(() => {
                this._originalArr = this.worklogs;

                //does not work ing vf -> aura -> lwc
                //dispatch success message 
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Index Updated',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.error = error;

                //does not work ing vf -> aura -> lwc
                //dispatch error message
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: reduceErrors(error).join(', '),
                        variant: 'error'
                    })
                );
            })
    }
}