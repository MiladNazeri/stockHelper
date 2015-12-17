'use strict';
var path = require('path');
var express = require('express');
var app = express();
module.exports = app;

// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js
require('./configure')(app);

 // if (process.env.NODE_ENV === 'production'){
 //    app.get('*', function(req,res,next){
 //        if(req.headers['x-forwarded-proto']!='https')
 //            res.redirect('https://mobyclick.herokuapp.com'+req.url)
 //        else
 //            next()
 //    })
 // }

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));

/*
 This middleware will catch any URLs resembling a file extension
 for example: .js, .html, .css
 This allows for proper 404s instead of the wildcard '/*' catching
 URLs that bypass express.static because the given file does not exist.
 */

// allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

app.get('/*', function response(req, res) {
  res.sendFile(app.get('indexHTMLPath'));
});

// app.get('/*', function (req, res) {
//     res.sendFile(app.get('indexHTMLPath'));
// });

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
