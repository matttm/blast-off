import express from 'express';
import getBrokerageAccountsRouter from "./brokerage-accounts.route";
import UsersController from "../controllers/users.controller";

export default async function getUsersRouter() {

    const router = express.Router();
    const usersController = new UsersController();
    // initialize subroutes
    router.use('/:userId/brokerage-accounts', await getBrokerageAccountsRouter());

    /* handling users. */
    router.route('/')
        .get(
            usersController.getUsers
        )
        .post(
            usersController.createUser
        );
    /* Handling a specific user */
    router.route('/:userId')
        .get(
            usersController.getUser
        )
        .put(
            usersController.updateUser
        )
        .delete(
            usersController.deleteUser
        );
    return router;
}
