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

class LineItem extends React.Component {
    number() {
        return (parseInt(this.props.index) + 1);
    }
    calculateTotal() {
        let { price, amount } = this.props;
        let p = parseFloat(price);
        let a = parseFloat(amount);
        return ((isNaN(p) || isNaN(a)) ? 0 : p * a);
    }
    render() {
        let { index, price, priceChanged,
              amount, amountChanged, deleteLineItem } = this.props;

        return(
            <tr>
                <td>{this.number()}</td>
                <td>
                    <input name="title" className="form-control"/>
                </td>
                <td>
                    <div className="input-group">
                        <div className="input-group-addon">$</div>
                        <input name="price" value={price}
                                className="form-control"
                                onChange={priceChanged.bind(null, index)} />
                    </div>
                </td>
                <td>
                    <input name="amount" value={amount} className="form-control"
                            onChange={amountChanged.bind(null, index)} />
                </td>
                <td>
                    <h4>${this.calculateTotal()}</h4>
                </td>
                <td>
                    <button className="btn btn-danger"
                            onClick={deleteLineItem.bind(this, index)} >
                        <span className="glyphicon glyphicon-trash"></span>
                    </button>
                </td>
            </tr>
        );
    }
}

class InvoiceLineItemsView extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                line_items: [
                    {price: null, amount: null}
                ]
            };
            console.log("Line_items", this.state.line_items)
            this.priceChanged = this.priceChanged.bind(this);
            this.amountChanged = this.amountChanged.bind(this);
            this.addLineItem = this.addLineItem.bind(this);
            this.deleteLineItem = this.deleteLineItem.bind(this);
        }
        priceChanged(index, event) {
            let { line_items } = this.state;
            line_items[index].price = event.target.value;
            this.setState({ line_items });
        }
        addLineItem(event) {
            let { line_items } = this.state;
            line_items.push({ price: null, amount: null });
            this.setState({ line_items });
        }
        deleteLineItem(index, event) {
            let { line_items } = this.state;
            line_items.splice(index, 1)
            this.setState({ line_items });
        }
        amountChanged(index, event) {
            let { line_items } = this.state;
            line_items[index].amount = event.target.value;
            this.setState({ line_items
            });
        }
        totalPrice(price, amount) {
            let p = parseFloat(price);
            let a = parseFloat(amount);
            return ((isNaN(p) || isNaN(a)) ? 0 : p * a);
        }
        calculateTotal() {
            let { line_items } = this.state;
            return line_items.map( i => this.totalPrice(i.price, i.amount))
                                .reduce( (pv, cv) => pv + cv, 0);
        }

        tableHeader() {
            return(
                <thead>
                    <tr>
                        <th width="1%">Nr</th>
                        <th width="55%">Name</th>
                        <th width="20%">Price</th>
                        <th width="10%">Amount</th>
                        <th width="10%">Total</th>
                        <th width="4%">Action</th>
                    </tr>
                </thead>
            );
        }

        tableFooter() {
            return(
                <tfoot>
                    <tr>
                      <td colSpan="4"></td>
                      <th><h4>${this.calculateTotal()}</h4></th>
                      <td>
                        <button className="btn btn-success"
                                onClick={this.addLineItem} >
                          <span className="glyphicon glyphicon-plus"></span>
                        </button>
                      </td>
                    </tr>
                </tfoot>
            );
        }

        render() {
            let line_items = [];
            this.state.line_items.map( (item, index) => {
                return line_items.push(
                    <LineItem
                            key={index}
                            index={index}
                            price={this.state.line_items[index].price}
                            amount={this.state.line_items[index].amount}
                            priceChanged={this.priceChanged}
                            amountChanged={this.amountChanged}
                            deleteLineItem={this.deleteLineItem} />
                )

            })
            return(
                <table className="table table-bordered table-hover">
                    {this.tableHeader()}
                    <tbody>
                        {line_items}
                    </tbody>
                        {this.tableFooter()}
                </table>
            )
        }
}