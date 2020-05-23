var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var poolRouter = require('./routes/pool.routes');
var sessionRouter = require('./routes/session.routes');
// var placesRouter = require('./routes/places.routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/pool', poolRouter);
app.use('/session', sessionRouter);
// app.use('/places', placesRouter);

module.exports = app;