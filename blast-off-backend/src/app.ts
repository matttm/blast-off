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
import getApiRouter from './routes/api';
import {roles} from "./enums";

export default async function getConfiguredHandler() {

  const primaryHandler = express();
  primaryHandler.use(logger('dev'));
  primaryHandler.use(express.json());
  primaryHandler.use(express.urlencoded({extended: false}));
  primaryHandler.use(cookieParser());
  primaryHandler.use(errorHandler);

  console.log('Connecting to database...');
  const connection = await createConnection();
  console.log('Database connection established.');

  const userRepository = await connection.getRepository(User);
  const admin = await userRepository.create();
  admin.firstName = process.env.ADMIN_FIRST_NAME || 'Matt';
  admin.lastName = process.env.ADMIN_LAST_NAME || 'Maloney';
  admin.username = process.env.ADMIN_USERNAME || 'matttm';
  admin.password = process.env.ADMIN_PASSWORD || 'password';
  admin.role = roles.ADMINISTRATOR;
  await userRepository.save(admin);

  console.log('Admin account created in database.');
  const users = await userRepository.find();
  console.log(`User Table: ${JSON.stringify(users)}`);

  // findAllControllers().map(applyController => applyController(primaryHandler));
  primaryHandler.use(entityNotFoundErrorHandler);

  // the api needs to be here after making db connection
  primaryHandler.use('/', indexRouter);
  primaryHandler.use('/api', await getApiRouter());

  return primaryHandler;
};
