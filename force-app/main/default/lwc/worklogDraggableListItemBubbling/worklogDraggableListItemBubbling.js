/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

export default class WorklogDraggableListItemBubbling extends LightningElement {
    @api worklog;

    handleDragStart(evt) {
       // console.log("in drag start");
        evt.dataTransfer.effectAllowed = 'move';
        // let dragBox = this.getElementsByTagName('div');
        // let XMLS = new XMLSerializer();
        // let dropBox_xmls = XMLS.serializeToString(dragBox);

        // event.dataTransfer.setData('text/plain' , dropBox_xmls);
        // console.log(event.target);
        // event.dataTransfer.setData('text/plain', event.target);

        const event = new CustomEvent('itemdragstart', {
            detail: this.worklog.Id
        });

        this.dispatchEvent(event);
        
    }

    handleDragOver(evt) {
        //console.log("in drag over");
        evt.preventDefault(); 
    
        evt.dataTransfer.dropEffect = 'move'; 

        const event = new CustomEvent('itemdragover', {
            detail: this.worklog.Id
        });

        this.dispatchEvent(event);

    }

    handleDrop(evt) {
        //console.log("in drop");
        // this/e.target is current target element.
      
        if (evt.stopPropagation) {
            evt.stopPropagation(); // Stops some browsers from redirecting.
        } 

        if(evt.currentTarget !== this.template) {
            console.log("in not equal");
            console.log(evt.currentTarget);
            console.log(this.template);
            // this.parentNode.removeChild(event.worklog);
            // let dropHTML = event.dataTransfer.getData('text/plain');
            // this.insertAdjacentText('beforebegin', dropHTML);
        }

        const event = new CustomEvent('itemdrop', {
            detail: this.worklog.Id
        });

        this.dispatchEvent(event);


        // // Don't do anything if dropping the same column we're dragging.

        //   // Set the source column's HTML to the HTML of the column we dropped on.
        //   //alert(this.outerHTML);
        //   //dragSrcEl.innerHTML = this.innerHTML;
        //   //this.innerHTML = e.dataTransfer.getData('text/html');
        //   this.parentNode.removeChild(dragSrcEl);
        //   var dropHTML = e.dataTransfer.getData('text/html');
        //   this.insertAdjacentHTML('beforebegin',dropHTML);
        //   var dropElem = this.previousSibling;
        //   addDnDHandlers(dropElem);

      }
}