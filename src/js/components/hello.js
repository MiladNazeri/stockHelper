import React from 'react';

export default class InvoiceLineItems extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <InvoiceLineItemsView />
            </div>
        );
    }
}

class InvoiceLineItemsView extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                Invoice line items component
            </div>
        );
    }
}
