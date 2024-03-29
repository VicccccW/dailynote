/* eslint-disable no-console */
/**
 * The pubsub communication approach is used to provide a communication mechanism between sibling components assembled in a flexipage (App Builder) where traditional parent/child communication patterns are not available.
 * Do NOT use this utility for parent/child communication. Use the guidelines below instead.
 * For child-to-parent communication, fire a DOM event in the child component
 * For parent-to-child communication, use property passing or call a public @api method defined in the child component
 */
import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class WorklogSearchBar extends LightningElement {

    //wire the current page refence using wire adapter
    @wire(CurrentPageReference) pageRef;

    //'searchKeyChange' is the event name
    handleKeyChange(event) {
        fireEvent(this.pageRef, 'searchKeyChange', event.target.value);
    }
}
//https://rajvakati.com/2019/01/31/lightning-web-components-events/