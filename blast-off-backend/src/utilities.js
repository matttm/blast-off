const { getConnection } = require("typeorm");
const EntityNotFoundError = require('typeorm/error/EntityNotFoundError');
const path = require('path');
const glob = require('glob');

function findAllControllers() {
    return glob
        .sync(path.join(__dirname, 'controllers/*'), { absolute: true })
        .map(controllerPath => require(controllerPath).default)
        .filter(applyController => applyController);
}

function errorHandler(error, req, res, next) {
    if (!error) {
        return next();
    }
    if (error) {
        res.status(500);
        res.json({ error: error.message });
    }
    console.error(error);
}

function entityNotFoundErrorHandler(error, req, res, next) {
    if (!(error instanceof EntityNotFoundError)) {
        return next(error);
    }
    res.status(401);
    res.json({ error: 'Not Found' });
}


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
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

function onError(error) {
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

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

/**
 * Gracefully shutdown, closing the  db if open.
 */
function gracefulShutdown() {
    console.log('Shutting down...');
    const connection = getConnection();
    // if (connection.)
    process.exit();
}

module.exports = {
    findAllControllers,
    errorHandler,
    entityNotFoundErrorHandler,
    normalizePort,
    onError,
    onListening,
    gracefulShutdown
};
