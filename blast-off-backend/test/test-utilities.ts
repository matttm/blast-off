import express from "express";
import supertest from "supertest";

/**
 * Enables an Express controller for testing
 *
 * @param router an Express router
 * @return {Test} a supertest object
 */
export const initRoute = (router) => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(router);
    // app.listen(3000);
    return supertest(app);
};
