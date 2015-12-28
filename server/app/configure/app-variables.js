'use strict';
var path = require('path');
var chalk = require('chalk');
var util = require('util');

var rootPath = path.join(__dirname, '../../../');
var indexPath = path.join(rootPath, './build/index.html');
// var faviconPath = path.join(rootPath, './build/favicon.ico');

var env = require(path.join(rootPath, './server/env'));

var logMiddleware = function (req, res, next) {
    util.log(('---NEW REQUEST---'));
    console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST ', req.method, req.path));
    console.log(util.format(chalk.yellow('%s: %s'), 'QUERY   ', util.inspect(req.query)));
    console.log(util.format(chalk.cyan('%s: %s'), 'BODY    ', util.inspect(req.body)));
    util.log(('---NEW RESPONSE---'));
    console.log(util.format(chalk.blue('%s: %s'), 'BODY    ', util.inspect(res.body)));
    next();
};

module.exports = function (app) {
    app.setValue('env', env);
    app.setValue('projectRoot', rootPath);
    app.setValue('indexHTMLPath', indexPath);
    // app.setValue('faviconPath', faviconPath);
    app.setValue('log', logMiddleware);
};
