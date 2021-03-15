import express from "express";
import {getBankAccountRepository, getBrokerageAccountRepository} from "../database/registrar";
import {BankAccount} from "../entities/bank-account";

const router = express.Router({ mergeParams: true });

export default async function getBankAccountsRouter() {
    const brokerageRepository =  getBrokerageAccountRepository();
    const bankRepository = getBankAccountRepository();
    /* GET users listing. */
    router.route('/')
        .get(async (req, res, next) => {
            const brokerageId = parseInt(req.params.brokerageId);
            const accounts = await bankRepository.getAllBankAccountsWithBrokerageId(brokerageId);
            res.status(200).json(accounts);
        })
        .post(async (req, res, next) => {
            const brokerageId = parseInt(req.params.brokerageId);
            const account = new BankAccount();
            const  brokerAccount = await brokerageRepository.getBrokerageAccountById(brokerageId);
            if (!brokerAccount) {
                // TODO:  check status
                res.status(422).send();
                return;
            }
            const results = await bankRepository.createAndSave(brokerAccount, account);
            res.status(201).json(results);
        });
    /* Handling a specific user */
    router.route('/:bankId')
        .get(async (req, res, next) => {
            const id = parseInt(req.params.bankId);
            const user = await bankRepository.getBankAccountById(id);
            res.status(200).json(user);
        })
        .put(async (req, res, next) => {
            const id = parseInt(req.params.bankId);
            const results = await bankRepository.updateById(id, req.body);
            return res.status(200).send(results);
        })
        .delete(async (req, res, next) => {
            const id = parseInt(req.params.bankId);
            const results = await bankRepository.removeById(id);
            return res.status(200).send(results);
        });
    return router;
}
