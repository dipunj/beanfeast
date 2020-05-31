var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var poolRouter = require('./routes/pool.routes');
var placeRouter = require('./routes/place.routes');

const app = express();
app.use(cors({ credentials: true, origin: ['localhost'] }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/pool', poolRouter);
app.use('/place', placeRouter);

module.exports = app;
