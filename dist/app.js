'use strict';
// Include dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Modular Route definitions
var exampleRoute = require('./routes/example');
// Error handler service
var errorHandler_1 = require('./services/errorHandler');
// Main app
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public'))); //serve public files
// Register routes (as middleware layer through express.Router())
app.use(exampleRoute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    res.status(404);
    console.log('catching 404 error');
    return next(err);
});
// error handlers
// development error handler - will print stacktrace
// production error handler - no stacktraces leaked to user
if (app.get('env') === 'development') {
    app.use(errorHandler_1.development);
}
else {
    app.use(errorHandler_1.production);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
