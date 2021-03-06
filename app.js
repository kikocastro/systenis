require('dotenv').load();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var initializer = require(path.join(__dirname, "config", "initializer"));
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


var moment = require("moment");
moment.locale('pt-br');
app.locals.moment = moment  ;

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(require("connect-assets")());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new FileStore({ttl: 60 * 60 * 24 * 30}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);


initializer(app).then(function() {
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

}).done();

module.exports = app;
