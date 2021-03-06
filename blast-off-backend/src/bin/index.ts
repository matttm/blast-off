#!/usr/bin/env node

/**
 * Module dependencies.
 */
import getConfiguredHandler from '../app';
import http from 'http';
import { config } from 'dotenv';
import path from 'path';
import {onError, gracefulShutdown, onListening, normalizePort} from "../utilities";

const startServer = async () => {
  console.log('Starting server');
  // Loading config based on environment type
  if (process.env.NODE_ENV) {
    console.log(`Running in ${process.env.NODE_ENV} mode`);
    const configObj = config({
      path: path.resolve(
          process.cwd(),
          `./configurations/${process.env.NODE_ENV}.config`
      )
    });
    if (configObj.error) {
      console.log('Error loading configuration file.');
      await gracefulShutdown();
    }
  } else {
    console.log('No node environment specified.');
    await gracefulShutdown();
  }
  // Loading secrets
  const secrets = config();
  if (secrets.error) {
    console.log('Secrets env not found, so some features will be disabled.');
  } else {
    console.log('Secrets env found and loaded to the environment.');
  }

  /**
   * Get port from environment and store in Express.
   */
  const handler = await getConfiguredHandler();
  const port = normalizePort(process.env.PORT || '3000');
  handler.set('port', port);

  /**
   * Create HTTP server.
   */
  const server = http.createServer(handler);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on('error', err => onError(port, err));
  server.on('listening', () => onListening(server));
};

startServer()
    .then(() => null)
    .catch((err) => {
      console.log(`Server could not be started`);
      console.log(`${err}`);
    });
