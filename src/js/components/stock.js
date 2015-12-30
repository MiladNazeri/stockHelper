import React from 'react';
import update from 'react-addons-update';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css'
import api from '../utils/api.js'
import './app.scss';
import Promise from 'bluebird';

export default class StockContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <StockView />
            </div>
        );
    }
}

class Stock extends React.Component {
    number() {
        return (parseInt(this.props.index) + 1);
    }
    render() {

        let { index,title,titleChange,buyPrice,buyPriceChange, shares, sharesChange,
              deleteLineItem } = this.props;

        return(
            <tr>
                <td>{this.number()}</td>
                <td>
                    <input name="title" value={title}
                        onChange={titleChange.bind(null, index)}
                        className="form-control"/>
                </td>
                <td>
                    <input type="number" name="buyPrice" value={buyPrice}
                        onChange={buyPriceChange.bind(null, index)}
                        className="form-control"/>
                </td>
                <td>
                    <input type="number" name="shares" value={shares}
                        onChange={sharesChange.bind(null, index)}
                        className="form-control" />
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

class Stock2 extends React.Component {
    number() {
        return (parseInt(this.props.index) + 1);
    }
    render() {
        let { index, percentage,percentageChange, days, daysChange,
              deleteLineItem2 } = this.props;

        return(
            <tr>
                <td>{this.number()}</td>
                <td>
                    <input name="percentage" value={percentage}
                        onChange={percentageChange.bind(null, index)}
                        className="form-control"/>
                </td>
                <td>
                    <input name="days" value={days}
                        onChange={daysChange.bind(null, index)}
                        className="form-control"/>
                </td>
                <td>
                    <button className="btn btn-danger"
                            onClick={deleteLineItem2.bind(this, index)} >
                        <span className="glyphicon glyphicon-trash"></span>
                    </button>
                </td>
            </tr>
        );
    }
}

class StockView extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                line_items: [
                    { title: null, buyPrice: null, shares: null, apiHistoricalResponse: null, apiRealTimeResponse: null }
                ],
                formula_items: [
                    { percentage: 6, days: 2, },
                    { percentage: 4, days: 4, },
                    { percentage: 2, days: 6, },
                    { percentage: -10, days: 10, }
                ],
                dateStart: null,
                dateStartFormat: null,
                dateEnd: null,
                dateEndFormat: null,
                updated: false
            }
            console.log("apiRealTimeResponse", this.state.line_items[0].apiRealTimeResponse)
            this.titleChange = this.titleChange.bind(this);
            this.updated = this.updated.bind(this);
            this.buyPriceChange = this.buyPriceChange.bind(this);
            this.sharesChange = this.sharesChange.bind(this);
            this.daysChange = this.daysChange.bind(this);
            this.percentageChange = this.percentageChange.bind(this);
            this.addLineItem = this.addLineItem.bind(this);
            this.addLineItem2 = this.addLineItem2.bind(this);
            this.dateStartChange = this.dateStartChange.bind(this);
            this.dateEndChange = this.dateEndChange.bind(this);
            this.deleteLineItem = this.deleteLineItem.bind(this);
            this.deleteLineItem2 = this.deleteLineItem2.bind(this);
            this.tableFooter = this.tableFooter.bind(this);
            this.tableHeader = this.tableHeader.bind(this);
            this.tableFooter2 = this.tableFooter2.bind(this);
            this.tableHeader2 = this.tableHeader2.bind(this);
            this.submitQuery = this.submitQuery.bind(this);
            this.valueChecker = this.valueChecker.bind(this);

        }
        titleChange(index, event) {
            let newArray = this.state.line_items.slice();
            newArray[index].title = event.target.value;
            this.setState({ line_items: newArray });
        }
        buyPriceChange(index, event) {
            let newArray = this.state.line_items.slice();
            newArray[index].buyPrice = event.target.value;
            this.setState({ line_items: newArray });
        }
        daysChange(index, event) {
            let newArray = this.state.formula_items.slice();
            newArray[index].days = event.target.value;
            this.setState({ formula_items: newArray });
        }
        percentageChange(index, event) {
            let newArray = this.state.formula_items.slice();
            newArray[index].percentage = event.target.value;
            this.setState({ formula_items: newArray });
        }
        sharesChange(index, event) {
            let newArray = this.state.line_items.slice();
            newArray[index].shares = event.target.value;
            this.setState({ line_items: newArray });
        }
        addLineItem(event) {
            this.setState({ line_items: update(this.state.line_items, {$push: [{title: null}] })  });
        }
        addLineItem2(event) {
            this.setState({ formula_items: update(this.state.formula_items, {$push: [{ percentage: null, days: null }] })  });
        }
        deleteLineItem(index, event) {
            this.setState({ line_items: update(this.state.line_items, {$splice: [[index, 1]] } ) });
        }
        deleteLineItem2(index, event) {
            this.setState({ formula_items: update(this.state.formula_items, {$splice: [[index, 1]] } ) });
        }

        dateStartChange(e){
            let date = new Date(e._d)
            let year = date.getFullYear().toString()
            let month = date.getMonth()+1
            let day = date.getDate()
            if (day.toString().length === 1)
                day = "0" + day
            let newDate = year+"-"+month+"-"+day
            this.setState({
                dateStart: e,
                dateStartFormat: newDate
            })
        }
        dateEndChange(e){
            let date = new Date(e._d)
            let year = date.getFullYear().toString()
            let month = date.getMonth()+1
            let day = date.getDate()
            if (day.toString().length === 1)
                day = "0" + day
            let newDate = year+"-"+month+"-"+day
            this.setState({
                dateEnd: e,
                dateEndFormat: newDate
            })
        }
        updated(){
            return this.state.updated;
        }
        submitQuery(e){

            // var accum = [];
            // for (var x = 0; x < line_items.length; x++ ){
            //      Promise.all([ api.realtimeQ(line_items[x].title),
            //     api.historicalQ(line_items[x].title, startDate, endDate) ])
            //     .then( (results) => {
            //         accum.push( [ results[0], results[1] ] )
            //     }).then( () => {
            //             newArray[x].apiRealTimeResponse = accum[x][0]
            //             newArray[x].apiHistoricalResponse = accum[x][1]
            //     })
            // }
            // this.setState({
            //     line_items: newArray,
            //     updated: true
            //  })
            e.preventDefault();
            this.setState({
                updated: false
             })
            let { line_items } = this.state
            let newArray = this.state.line_items.slice()
            let startDate = this.state.dateStartFormat;
            let endDate = this.state.dateEndFormat;
            var accum = [];
            var promises = [];

            for (let x = 0; x < line_items.length; x++) {
                promises.push(
                    Promise.all([
                         api.realtimeQ(line_items[x].title),
                         api.historicalQ(line_items[x].title, startDate, endDate)
                    ])
                    .then(results => {
                        accum.push([results[0], results[1]]);
                    })
                    .then(() => {
                        newArray[x].apiRealTimeResponse = accum[x][0];
                        newArray[x].apiHistoricalResponse = accum[x][1];
                  })
                );
              }

              Promise.all(promises)
                .then(() => {
                    this.setState({
                      line_items: newArray,
                      updated: true
                    });
                  });
        }
        tableHeader() {
            return(
                <thead>
                    <tr>
                        <th width="2%">Nr</th>
                        <th width="39%">Stock Symbol</th>
                        <th width="20%">Buy Price</th>
                        <th width="19%">Shares</th>
                        <th width="20%">Action</th>
                    </tr>
                </thead>
            );
        }
        tableHeader2() {
            return(
                <thead>
                    <tr>
                        <th width="2%">Nr</th>
                        <th width="39%">%</th>
                        <th width="39%">Day's Hold</th>
                        <th width="20%">Action</th>
                    </tr>
                </thead>
            );
        }

        tableFooter() {
            let { line_items } = this.state;
            console.log("footer line_items", line_items)
            var titles = [];
            for (var item in line_items){
                console.log("item in line_items", item)
                titles.push(line_items[item].title)
            }
            console.log("titles", titles)
            return(
                <tfoot>
                    <tr>
                      <td colSpan="3"></td>
                      <th></th>
                      <td>
                        <button className="btn btn-success"
                                onClick={this.addLineItem} >
                          <span className="glyphicon glyphicon-plus"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                        <td colSpan="4"></td>
                        <td>
                            <button className="btn btn-primary"
                                    onClick={this.submitQuery} >
                            Submit
                            </button>
                        </td>
                    </tr>

                </tfoot>
            );
        }
        tableFooter2() {
            let { formula_items } = this.state;
            console.log("footer line_items", formula_items)
            var formulas = [];
            return(
                <tfoot>
                    <tr>
                      <td colSpan="2"></td>
                      <th></th>
                      <td>
                        <button className="btn btn-success"
                                onClick={this.addLineItem2} >
                          <span className="glyphicon glyphicon-plus"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                        <td colSpan="3"></td>
                        <td>
                        </td>
                    </tr>

                </tfoot>
            );
        }
        valueChecker(buyPrice, lowPrice, highPrice, percentage){
            let multiplyPercentage = (100 + percentage) * .01;
            let buyPriceAfterPercentage = buyPrice * multiplyPercentage;
            if (multiplyPercentage > 1) {
                if (lowPrice < buyPriceAfterPercentage && buyPriceAfterPercentage > highPrice ){
                    return ["Held", "$"+buyPriceAfterPercentage.toFixed(2), "$"+(buyPriceAfterPercentage-buyPrice).toFixed(2)].join("-")
                }
                if (lowPrice < buyPriceAfterPercentage && buyPriceAfterPercentage <= highPrice ){
                    return ["Sold", "$"+buyPriceAfterPercentage.toFixed(2), "$"+(buyPriceAfterPercentage-buyPrice).toFixed(2)].join("-")
                }
                if (lowPrice >= buyPriceAfterPercentage){
                    return ["Sold", "$"+buyPriceAfterPercentage.toFixed(2), "$"+(buyPriceAfterPercentage-buyPrice).toFixed(2)].join("-")
                }

            }
            if (multiplyPercentage < 1) {
                if (lowPrice < buyPriceAfterPercentage){
                    return ["Sold", "$"+buyPriceAfterPercentage.toFixed(2), "$"+(buyPriceAfterPercentage-buyPrice).toFixed(2)].join("-")
                }
                if (lowPrice > buyPriceAfterPercentage){
                    return ["Held", "$"+buyPriceAfterPercentage.toFixed(2), "$"+(buyPriceAfterPercentage-buyPrice).toFixed(2)].join("-")
                }
            }
        }
        render() {
            console.log("this.state.line.items", this.state.line_items)
            let line_items = [];

            for(var index in this.state.line_items) {
                line_items.push(
                    <Stock
                            key={index}
                            index={index}
                            title={this.state.line_items[index].title}
                            shares={this.state.line_items[index].shares}
                            buyPrice={this.state.line_items[index].buyPrice}
                            titleChange={this.titleChange}
                            sharesChange={this.sharesChange}
                            deleteLineItem={this.deleteLineItem}
                            buyPriceChange={this.buyPriceChange} />
                )
            }
            let formula_items = [];
            for(var index in this.state.formula_items) {
                formula_items.push(
                    <Stock2
                            key={index}
                            index={index}
                            percentage={this.state.formula_items[index].percentage}
                            days={this.state.formula_items[index].days}
                            percentageChange={this.percentageChange}
                            daysChange={this.daysChange}
                            deleteLineItem2={this.deleteLineItem2} />
                )
            }

            var result_items = [];
            if ( this.updated() ) {
            for(var index in this.state.line_items) {
                result_items.push(
                <ResultsView
                    key={index}
                    formula_items={this.state.formula_items}
                    apiHistoricalResponse={this.state.line_items[index].apiHistoricalResponse.data.query.results.quote}
                    valueChecker={this.valueChecker}
                    shares={this.state.line_items[index].shares}
                    buyPrice={this.state.line_items[index].buyPrice}
                    name={this.state.line_items[index].apiRealTimeResponse.data.query.results.quote.Name}
                    bidRealtime={this.state.line_items[index].apiRealTimeResponse.data.query.results.quote.BidRealtime} />
                    )
                }
            }

            return( <div className="grid">
                        <div className="table">
                            <table className="table table-bordered" style={{width:"25%"}}>
                                <thead>
                                    <tr>
                                        <th width="50%">Date start</th>
                                        <th width="50%">Date End</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <DatePicker
                                                    key="1"
                                                    selected={this.state.dateStart}
                                                    onChange={this.dateStartChange}
                                                    dateFormat="YYYYMMDD" />
                                        </td>
                                        <td>
                                            <DatePicker
                                                    key="2"
                                                    selected={this.state.dateEnd}
                                                    onChange={this.dateEndChange}
                                                    dateFormat="YYYYMMDD" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="table table-bordered" style={{width:"75%"}}>
                                {this.tableHeader()}
                                <tbody>
                                    {line_items}
                                </tbody>
                                    {this.tableFooter()}
                            </table>

                            <table className="table table-bordered" style={{width:"75%"}}>
                                {this.tableHeader2()}
                                <tbody>
                                    {formula_items}
                                </tbody>
                                    {this.tableFooter2()}
                            </table>

                            <div className="results">
                                {result_items}
                            </div>
                        </div>
                </div>
                )
            }
        }

class ResultsView extends React.Component {
    render(){
        var { formula_items,apiHistoricalResponse, valueChecker, shares, buyPrice, name, bidRealtime } = this.props
        var cellStyle = null;
        var perShare = null;
        if(apiHistoricalResponse){
            var reverseArray = apiHistoricalResponse;
            reverseArray.reverse();
        }
        return(
            <div>
                <table className="table table-bordered" style={{width:"50%"}}>
                    <thead>
                        <tr>
                            <th width="50%">Name:</th>
                            <th width="50%">Real Time Bid:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <p>{name}</p>
                            </td>
                            <td>
                                <p>{bidRealtime}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Day:</th>
                            <th>Date:</th>
                            <th>Open:</th>
                            <th>Close:</th>
                            <th>High:</th>
                            <th>Low:</th>
                            <th>Volume:</th>
                            {formula_items &&
                                formula_items.map( (item, index) => {
                                return (<div><th key={index}>{item.percentage+"%"}</th>
                                        <th key={"b"+index}>Total Made</th></div>)
                                }
                                )}
                        </tr>
                    </thead>
                    <tbody>
                        {reverseArray.map( (date, index) => {
                            return(
                                <tr key={index}>
                                    <td><p>{index+1}</p></td>
                                    <td><p>{date.Date}</p></td>
                                    <td><p>{date.Open}</p></td>
                                    <td><p>{date.Close}</p></td>
                                    <td><p>{date.High}</p></td>
                                    <td><p>{date.Low}</p></td>
                                    <td><p>{date.Volume}</p></td>
                                    {formula_items  &&
                                        formula_items.map( (item, index) => {
                                        {cellStyle = valueChecker(buyPrice, date.Low, date.High, item.percentage).split("-")[0].toString()}
                                        {perShare = valueChecker(buyPrice, date.Low, date.High, item.percentage).split("-")[1]}
                                        return (
                                            <div>
                                                <td key={index} className={cellStyle}>
                                                <p>{valueChecker(buyPrice, date.Low, date.High, item.percentage)}</p></td>
                                                    <td key={"a"+index} className={cellStyle}>
                                                <p>{ (parseFloat(perShare.substr(1,perShare.length)) * parseFloat(shares)).toFixed(2) }</p></td>
                                            </div>

                                            )
                                        })
                                    }
                                </tr>
                                )
                            }

                        )
                        }

                    </tbody>
                </table>
            </div>
        )
    }
}



