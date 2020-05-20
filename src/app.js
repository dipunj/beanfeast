import './config';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import cableRouter from './routes/cable.routes';
import poolRouter from './routes/pool.routes';
// import placesRouter from './routes/places.routes';
import db from './db/database';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/cable', cableRouter);
app.use('/pool', poolRouter);
// app.use('/places', placesRouter);

export default app;
