import express from 'express';
import getBankAccountsRouter from "./bank-accounts.route";
import getPositionsRouter from "./positions.route";
import BrokerageAccountsController from "../controllers/brokerage-accounts.controller";

export default async function getBrokerageAccountsRouter() {

    const brokerageAccountsController = new BrokerageAccountsController();
    const router = express.Router({ mergeParams: true });
    router.use('/:brokerageId/bank-accounts', await getBankAccountsRouter());
    router.use('/:brokerageId/positions', await getPositionsRouter());

    /* handle all brokerage accounts of user. */
    router.route('/')
        .get(
            brokerageAccountsController.getBrokerAccounts
        )
        .post(
            brokerageAccountsController.createBrokerageAccount
        );
    /* Handling a specific brokerage account */
    router.route('/:brokerageId')
        .get(
            brokerageAccountsController.getBrokerageAccount
        )
        .put(
            brokerageAccountsController.updateBrokerageAccount
        )
        .delete(
            brokerageAccountsController.deleteBrokerageAccount
        );
    return router;
}
