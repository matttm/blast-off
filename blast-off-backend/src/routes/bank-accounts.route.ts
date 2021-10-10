import express from "express";
import BankAccountsController from "../controllers/bank-accounts.controller";

export default async function getBankAccountsRouter() {

    const bankAccountsController = new BankAccountsController();
    const router = express.Router({ mergeParams: true });

    router.route('/')
        .get(
            bankAccountsController.getBankAccounts
        )
        .post(
            bankAccountsController.createBankAccount
        );
    router.route('/:bankId')
        .get(
            bankAccountsController.getBankAccount
        )
        .put(
            bankAccountsController.updateBankAccount
        )
        .delete(
            bankAccountsController.deleteBankAccount
        );
    return router;
}
