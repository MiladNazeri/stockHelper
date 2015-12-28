import React from 'react';
import update from 'react-addons-update';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css'
import api from '../utils/api.js'
import './app.scss';

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
        let { index, title,titleChange,
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
                    { title: null }
                ],
                formula_items: [
                    { percentage: null, days: null }
                ],
                dateStart: null,
                dateStartFormat: null,
                dateEnd: null,
                dateEndFormat: null,
                apiRealTimeResponse: null,
                apiHistoricalResponse: null
            }
            console.log("moment:", moment())
            console.log("Line_items", this.state.line_items)
            this.titleChange = this.titleChange.bind(this);
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

        }
        titleChange(index, event) {
            console.log("title change index:", index)
            console.log("title change event:", event)
            console.log("state.line_items:", this.state.line_items)
            let newArray = this.state.line_items.slice();
            console.log("newArray:", newArray)
            newArray[index].title = event.target.value;
            this.setState({ line_items: newArray });
        }
        daysChange(index, event) {
            let newArray = this.state.formula_items.slice();
            console.log("newArray:", newArray)
            newArray[index].days = event.target.value;
            this.setState({ formula_items: newArray });
        }
        percentageChange(index, event) {
            let newArray = this.state.formula_items.slice();
            console.log("newArray:", newArray)
            newArray[index].percentage = event.target.value;
            this.setState({ formula_items: newArray });
        }
        addLineItem(event) {
            this.setState({ line_items: update(this.state.line_items, {$push: [{title: null}] })  });
        }
        addLineItem2(event) {
            this.setState({ formula_items: update(this.state.formula_items, {$push: [{ percentage: null, days: null }] })  });
        }
        deleteLineItem(index, event) {
        console.log("delete index:", index)

            this.setState({ line_items: update(this.state.line_items, {$splice: [[index, 1]] } ) });
        }
        deleteLineItem2(index, event) {
        console.log("delete index:", index)

            this.setState({ formula_items: update(this.state.formula_items, {$splice: [[index, 1]] } ) });
        }
        // dateStartChange(e){
        //     console.log("date start", e)
        //     this.setState({
        //         dateStart: e
        //     })
        // }
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
        submitQuery(e){
            let title = this.state.line_items[0].title;
            let startDate = this.state.dateStartFormat;
            let endDate = this.state.dateEndFormat;
            e.preventDefault();
            api.realtimeQ(title)
            .then((response) => {
                console.log("response", response)
                this.setState({
                    apiRealTimeResponse: response
                });
            })
            .then( () => {
                api.historicalQ(title, startDate, endDate)
                .then( (response) => {
                    console.log("Historical response", response)

                    this.setState({
                        apiHistoricalResponse: response
                    });
                })
            })

        }
        tableHeader() {
            return(
                <thead>
                    <tr>
                        <th width="2%">Nr</th>
                        <th width="78%">Stock Symbol</th>
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
                      <td colSpan="1"></td>
                      <th>{this.state.dateStartFormat}-{this.state.dateEndFormat}-{titles.join(",")}</th>
                      <td>
                        <button className="btn btn-success"
                                onClick={this.addLineItem} >
                          <span className="glyphicon glyphicon-plus"></span>
                        </button>
                      </td>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
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
                            <button className="btn btn-primary"
                                    onClick={this.submitQuery2} >
                            Submit
                            </button>
                        </td>
                    </tr>

                </tfoot>
            );
        }

        render() {
            let line_items = [];
            for(var index in this.state.line_items) {
                line_items.push(
                    <Stock
                            key={index}
                            index={index}
                            title={this.state.line_items[index].title}
                            titleChange={this.titleChange}
                            deleteLineItem={this.deleteLineItem} />
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
            return(
                <div className="grid">
                    <div className="formula">
                    </div>
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
                                                dateFormat="YYMMDD" />
                                    </td>
                                    <td>
                                        <DatePicker
                                                key="2"
                                                selected={this.state.dateEnd}
                                                onChange={this.dateEndChange}
                                                dateFormat="YYMMDD" />
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

                    </div>
                        <div className="results">
                            <div>
                                {this.state.apiRealTimeResponse &&
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
                                                        <p>{this.state.apiRealTimeResponse.data.query.results.quote.Name}</p>
                                                    </td>
                                                    <td>
                                                        <p>{this.state.apiRealTimeResponse.data.query.results.quote.BidRealtime}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                }
                                 {this.state.apiHistoricalResponse &&
                                    <div>
                                        <hr />
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Date:</th>
                                                        <th>Open:</th>
                                                        <th>Close:</th>
                                                        <th>High:</th>
                                                        <th>Low:</th>
                                                        <th>Volume:</th>
                                                        {this.state.formula_items &&

                                                                this.state.formula_items.map( (item, index) => {
                                                                return (<th key={index}>{item.percentage+"%"}</th>)
                                                                })}

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.apiHistoricalResponse.data.query.results.quote.reverse().map( (date, index) => {
                                                        return(
                                                            <tr key={index}>
                                                                <td><p>{date.Date}</p></td>
                                                                <td><p>{date.Open}</p></td>
                                                                <td><p>{date.Close}</p></td>
                                                                <td><p>{date.High}</p></td>
                                                                <td><p>{date.Low}</p></td>
                                                                <td><p>{date.Volume}</p></td>
                                                                {(this.state.formula_items && this.state.apiHistoricalResponse) ?
                                                                    this.state.formula_items.map( (item, index) => {
                                                                    <td key={index}><p>{item.percentage+"%"}</p></td>
                                                                    }) : null
                                                                }
                                                            </tr>
                                                            )
                                                        }

                                                    )
                                                    }

                                                </tbody>
                                            </table>

                                    </div>
                                }
                            </div>
                        </div>
                </div>
                )
            }
        }




