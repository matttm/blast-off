import express from 'express';
import {getUserRepository} from "../database/registrar";
const UsersController = require('../controllers/users.controller');
import getBrokerageAccountsRouter from "./brokerage-accounts";

const router = express.Router();

export default async function getUsersRouter() {

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
