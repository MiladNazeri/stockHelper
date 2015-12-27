import '../stylesheets/main.scss';

import React from 'react';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div id="inputSymbol">
                        <p>Enter Stock</p>
                        <input id="startDate" class="datePick required" type="text"  Placeholder="From" />
                        <input id="endDate" class="datePick" type="text" Placeholder="To"  />

                        <input id="txtSymbol" class="required" Placeholder="Symbol" />

                        <button ID="submit">Submit</button>
                    </div>
                <div class="realtime">
                    <div><p>Name</p><span id="symbol"></span></div>
                    <div><p>RealtimeBid</p><span id="bidRealtime"></span></div>
                </div>
                <div class="historical">
                    <div><p>Date</p><span id="date"></span></div>
                    <div><p>Price Close</p><span id="closeValue"></span></div>
                    <div><p>Price High</p><span id="highValue"></span></div>
                    <div><p>Price Low</p><span id="lowValue"></span></div>
                    <div><p>Volume</p><span id="volume"></span></div>
                </div>
            {this.props.children}
            </div>
        )
    }
}

export default App;

//input formula to use LAST
//Global start and end date
//Input to enter stock you want to check
//Plus to add another stock
//all stocks get put in array
//object built from api call on each stock in array
//analaysis based on formula
//
//