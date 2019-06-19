import { LightningElement, api, track } from 'lwc';

/** Static Resources. */
import LOGO_ASSETS_URL from '@salesforce/resourceUrl/logo_assets';

export default class Placeholder extends LightningElement {
    @api message;

    /** Url for logo. */
    @track logoUrl = LOGO_ASSETS_URL + '/logo.svg';
}
