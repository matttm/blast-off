import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {entityNotFoundErrorHandler} from "./utilities";
import {errorHandler} from "./utilities";
import {findAllControllers} from "./utilities";
import {createConnection} from "typeorm";
import {User} from "./entities/user";

import indexRouter from './routes';
import usersRouter from './routes/users';
import {roles} from "./enums";

export default async function getConfiguredHandler() {

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
  const admin = new User();
  // TODO: change these to an environment variable
  admin.firstName = process.env.ADMIN_FIRST_NAME || 'Matt';
  admin.lastName = process.env.ADMIN_LAST_NAME || 'Maloney';
  admin.role = roles.ADMINISTRATOR;
  await userRepository.save(admin);
  console.log('Admin account created in database.');
  const users = await userRepository.find();
  console.log(`User Table: ${JSON.stringify(users)}`);

  findAllControllers().map(applyController => applyController(primaryHandler));
  primaryHandler.use(entityNotFoundErrorHandler);
  primaryHandler.use(errorHandler);
  return primaryHandler;
};
