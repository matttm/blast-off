import express from "express";
import getSessionsRouter from "./session.route";
import getUsersRouter from "../routes/users.route";

export default async function getApiRouter() {
    const router = express.Router();
    router.use('/session', getSessionsRouter());
    router.use('/users', await getUsersRouter());
    return router;
}
