import express from "express";
import sessionRoute from "./session";
import getUsersRouter from "../routes/users.route";

export default async function getApiRouter() {
    const router = express.Router();
    router.use('/session', sessionRoute);
    router.use('/users', await getUsersRouter());
    return router;
}
