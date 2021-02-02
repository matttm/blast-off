import {Connection, getConnection} from "typeorm";
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import path from 'path';
import glob from 'glob';

export function findAllControllers() {
    return glob
        .sync(path.join(__dirname, 'controllers/*'), { absolute: true })
        .map(controllerPath => require(controllerPath).default)
        .filter(applyController => applyController);
}

export function errorHandler(error, req, res, next) {
    if (!error) {
        return next();
    }
    if (error) {
        res.status(500);
        res.json({ error: error.message });
    }
    console.error(error);
}

export function entityNotFoundErrorHandler(error, req, res, next) {
    if (!(error instanceof EntityNotFoundError)) {
        return next(error);
    }
    res.status(401);
    res.json({ error: 'Not Found' });
}


/**
 * Normalize a port into a number, string, or false.
 */
export function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

export function onError(port, error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

export function onListening(server) {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

/**
 * Gracefully shutdown, closing the  db if open.
 */
export async function gracefulShutdown(): Promise<void> {
    console.log('Shutting down...');
    const connection: Connection = getConnection();
    if (connection.isConnected) {
        await connection.close();
    }
    process.exit();
}
