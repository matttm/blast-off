const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {entityNotFoundErrorHandler} = require("./utilities");
const {errorHandler} = require("./utilities");
const {findAllControllers} = require("./utilities");
const {createConnection} = require("typeorm");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const {gracefulShutdown} = require("./utilities");
const {User} = require("./models/user");

const getConfiguredHandler = async () => {

// TODO: should this actually be blastOffHandler?
  const primaryHandler = express();
  primaryHandler.use(logger('dev'));
  primaryHandler.use(express.json());
  primaryHandler.use(express.urlencoded({extended: false}));
  primaryHandler.use(cookieParser());

  primaryHandler.use('/', indexRouter);
  primaryHandler.use('/users', usersRouter);

// catch 404 and forward to error handler
  primaryHandler.use(function (req, res, next) {
    next(createError(404));
  });

// error handler
  primaryHandler.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  console.log('Connecting to database...');
  const connection = await createConnection();
  console.log('Database connection established.');

  // TODO: create admin account here?
  const userRepository = await connection.getRepository(User);
  const admin = new User(0, "admin", "Matt", "Maloney", null);

  await userRepository.save(admin);
  console.log('Admin account created in database.');
  const users = await userRepository.find();
  console.log(`User Table: ${users}`);

  findAllControllers().map(applyController => applyController(primaryHandler));
  primaryHandler.use(entityNotFoundErrorHandler);
  primaryHandler.use(errorHandler);
  return primaryHandler;
};

module.exports = getConfiguredHandler;
