/* eslint-disable no-console */
import { LightningElement, wire, track, api} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getAllWorklogs from '@salesforce/apex/WorklogController.getAllWorklogs';
import saveWorklogs from '@salesforce/apex/WorklogController.saveWorklogs';
import { CurrentPageReference } from 'lightning/navigation';
//import { fireEvent } from 'c/pubsub';
import { reduceErrors } from 'c/idsUtils';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class WorklogDraggableModalPage extends LightningElement {
    
    @track worklogs;

    @track error;

    _originalArr;

    @wire(CurrentPageReference) pageRef;

    _wiredWorklogsResult;

    @wire(getAllWorklogs)
    wiredWorklogs(result) {
        this._wiredWorklogsResult = result;

        if(result.data) {
            this.worklogs = JSON.parse(JSON.stringify(result.data));
            this._originalArr = JSON.parse(JSON.stringify(result.data));
            //https://salesforce.stackexchange.com/questions/256761/uncaught-typeerror-set-on-proxy-trap-returned-falsish-for-property-name
            this.error = undefined;
        } else if (result.error) {
            this.worklogs = undefined;
            this.error = result.error;
        }
    }

    handleItemDrop(event) {

        const movedItem = this.worklogs.find((element, index) => index === event.detail.oldIndex);

        const remainingItems = this.worklogs.filter((element, index) => index !== event.detail.oldIndex);

        remainingItems.splice(event.detail.newIndex, 0, movedItem);
        
        //change index
        remainingItems.forEach((element, index) => {
            element.Drag_Table_Index__c = index;
        });

        //re-order new items based on new index
        remainingItems.sort((a, b) => {
            return a.Drag_Table_Index__c - b.Drag_Table_Index__c;
        });

        //update worklogs property
        this.worklogs = remainingItems;

        // //enable buttons 
        const evt = new CustomEvent('itemdrop', {
            bubbles: true
        });

        this.dispatchEvent(evt)
    }

    handleSelect(event) {
        //fireEvent(this.pageRef, 'worklogSelected', event.target.worklog.Id);
        console.log("item selected");
    }

    @api
    handleRevert(event) {
        this.worklogs = this._originalArr;
    }

    @api
    handleSave(event) {        
        //save data to server
        const savedWorklogsStr = JSON.stringify(this.worklogs);

        return saveWorklogs({ savedWorklogsStr : savedWorklogsStr })
            .then(() => {
                this._originalArr = this.worklogs;

                //dispatch success message 
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Index Updated',
                        variant: 'success'
                    })
                );
                

                return refreshApex(this._wiredWorklogsResult);
            })
            .catch(error => {
                this.error = error;

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