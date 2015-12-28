import axios from 'axios';
var yqlURL="http://query.yahooapis.com/v1/public/yql?q=";
var dataFormat="&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";


var api = {
    realtimeQ(symbol) {
        console.log("symbol being sent", symbol)
        return axios.get(`${yqlURL}select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${symbol}%22)%0A%09%09&${dataFormat}`)
    },
    historicalQ(symbol,startDate,endDate) {
        console.log("Historical symbol being sent", symbol)
        return axios.get(`${yqlURL}select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22${symbol}%22%20and%20startDate%20%3D%20%22${startDate}%22%20and%20endDate%20%3D%20%22${endDate}%22${dataFormat}`)
    }
}

export default api


// var realtimeQ = yqlURL+"select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + symbol + "%22)%0A%09%09&"+ dataFormat;
//     var historicalQ = yqlURL+"select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22"+ symbol +"%22%20and%20startDate%20%3D%20%22"+ startDate +"%22%20and%20endDate%20%3D%20%22"+ endDate +"%22"+ dataFormat;

//     $(function() {
//         $.getJSON(realtimeQ, function(json) {//YQL Request
//             $('#symbol').text(json.query.results.quote.Name);//Assign quote.Param to span tag
//             $('#bidRealtime').text(json.query.results.quote.BidRealtime);
//         });
//     });
//     $(function() {
//         $.getJSON(historicalQ, function(json) {
//             $.each(json.query.results.quote, function(i, quote) {//loop results.quote object
//                     console.log(quote)
//                 $("#date").append('<span>' + quote.Date + '</span');//create span for each record
//             });
//             $.each(json.query.results.quote, function(i, quote) { //new each statement is needed
//                 $("#closeValue").append('<span>' + quote.Close + '</span');
//             });
//             $.each(json.query.results.quote, function(i, quote) { //new each statement is needed
//                 $("#highValue").append('<span>' + quote.High + '</span');
//             });
//             $.each(json.query.results.quote, function(i, quote) { //new each statement is needed
//                 $("#lowValue").append('<span>' + quote.Low + '</span');
//             });
//             $.each(json.query.results.quote, function(i, quote) { //new each statement is needed
//                 $("#volume").append('<span>' + quote.Volume + '</span');
//             });
//         });
//     });
// });