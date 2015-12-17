'use strict';
var router = require('express').Router();
// s
//
//
//

router.use('/users', require('./users.router.js'));
// router.use('/s3', require('./s3.router.js'));



    // Make sure this is after all of
    // the registered routes!
    router.use(function (req, res) {
        res.status(404).end();
    });

module.exports = router
