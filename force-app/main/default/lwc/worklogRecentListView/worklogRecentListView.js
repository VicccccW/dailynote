import { LightningElement, wire, track } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import WORKLOG_OBJECT from '@salesforce/schema/Worklog__c';

export default class DailynoteLogRecentListView extends LightningElement {
    @track result;
    @track error;

    // @wire(getListUi, { objectApiName: WORKLOG_OBJECT, listViewApiName: 'Recent_Worklog' })
    // listView;
    
    // get worklogs() {
    //     return this.listView.data.records.records;
    // }



    @wire(getListUi, { objectApiName: WORKLOG_OBJECT, listViewApiName: 'Recent_Worklog' })
    wiredlistView({ error, data }) {
        if(data) {
            this.result = data.records.records;
        } else if (error) {
            this.error = error;
        }
    }


}