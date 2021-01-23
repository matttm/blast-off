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

module.exports = {
    findAllControllers,
    errorHandler,
    entityNotFoundErrorHandler
};
