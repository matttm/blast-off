const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {entityNotFoundErrorHandler} = require("./utilities");
const {errorHandler} = require("./utilities");
const {findAllControllers} = require("./utilities");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// TODO: should this actually be blastOffHandler?
const primaryHandler = express();

primaryHandler.use(logger('dev'));
primaryHandler.use(express.json());
primaryHandler.use(express.urlencoded({ extended: false }));
primaryHandler.use(cookieParser());

primaryHandler.use('/', indexRouter);
primaryHandler.use('/users', usersRouter);

// catch 404 and forward to error handler
primaryHandler.use(function(req, res, next) {
  next(createError(404));
});

// error handler
primaryHandler.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

findAllControllers().map(applyController => applyController(primaryHandler));
primaryHandler.use(entityNotFoundErrorHandler);
primaryHandler.use(errorHandler);

module.exports = primaryHandler;
