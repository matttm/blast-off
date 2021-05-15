import express from "express";
import {getBankAccountRepository, getBrokerageAccountRepository} from "../database/registrar";
import {BankAccount} from "../entities/bank-account";

const router = express.Router({mergeParams: true});

export default class BankAccountsController {
    private brokerageRepository = getBrokerageAccountRepository();
    private bankRepository = getBankAccountRepository();

    async getBankAccounts(req, res, next) {
        const brokerageId = parseInt(req.params.brokerageId);
        const accounts = await this.bankRepository.getAllBankAccountsWithBrokerageId(brokerageId);
        res.status(200).json(accounts);
    }

    async createBankAccount(req, res, next) {
        const brokerageId = parseInt(req.params.brokerageId);
        const account = new BankAccount();
        const brokerAccount = await this.brokerageRepository.getBrokerageAccountById(brokerageId);
        if (!brokerAccount) {
            // TODO:  check status
            res.status(422).send();
            return;
        }
        const results = await this.bankRepository.createAndSave(brokerAccount, account);
        res.status(201).json(results);
    }

    async getBankAccount(req, res, next) {
        const id = parseInt(req.params.bankId);
        const user = await this.bankRepository.getBankAccountById(id);
        res.status(200).json(user);
    }

    async updateBankAccount(req, res, next) {
        const id = parseInt(req.params.bankId);
        const results = await this.bankRepository.updateById(id, req.body);
        return res.status(200).send(results);
    }

    async deleteBankAccount(req, res, next) {
        const id = parseInt(req.params.bankId);
        const results = await this.bankRepository.removeById(id);
        return res.status(200).send(results);
    }
}
