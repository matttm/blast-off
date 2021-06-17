import express from 'express';
import SessionsController from "../controllers/session.controller";

export default function getSessionsRouter() {
    const sessionsController = new SessionsController();
    const router = express.Router();
    router.route('/')
        .post(
            sessionsController.createSession
        )
        .delete(
            sessionsController.deleteSession
        );
    return router;
}
