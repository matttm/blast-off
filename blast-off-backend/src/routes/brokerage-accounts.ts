import express from 'express';
import {BrokerageAccount} from "../entities/brokerage-account";
import {getBrokerageAccountRepository, getUserRepository} from "../database/registrar";
import {User} from "../entities/user";

const router = express.Router({ mergeParams: true });

export default async function getBrokerageAccountsRouter() {
    const userRepository = getUserRepository();
    const brokerageRepository =  getBrokerageAccountRepository();
    /* GET users listing. */
    router.route('/')
        .get(async (req, res, next) => {
            const userId = parseInt(req.params.userId);
            const accounts = await brokerageRepository.getAllBrokerageAccountsWithUserId(userId);
            res.status(200).json(accounts);
        })
        .post(async (req, res, next) => {
            const userId = parseInt(req.params.userId);
            const account = new BrokerageAccount();
            const  user = await userRepository.getUserById(userId);
            if (!userId) {
                // TODO:  check status
                res.status(422).send();
                return;
            }
            const results = await brokerageRepository.createAndSave(user as User, account);
            res.status(201).json(results);
        });
    /* Handling a specific user */
    router.route('/:brokerageId')
        .get(async (req, res, next) => {
            const id = parseInt(req.params.brokerageId);
            const user = await brokerageRepository.getAllBrokerageAccountsById(id);
            res.status(200).json(user);
        })
        .put(async (req, res, next) => {
            const id = parseInt(req.params.brokerageId);
            const results = await brokerageRepository.updateById(id, req.body);
            return res.status(200).send(results);
        })
        .delete(async (req, res, next) => {
            const id = parseInt(req.params.brokerageId);
            const results = await brokerageRepository.removeById(id);
            return res.status(200).send(results);
        });
    return router;
}
