import express from 'express';
import {getRepository} from "typeorm";
import {BrokerageAccount} from "../entities/brokerage-account";
const router = express.Router();

export default async function getBrokerageAccountsRouter() {
    const brokerageRepository = await getRepository(BrokerageAccount);
    /* GET users listing. */
    router.route('/')
        .get(async (req, res, next) => {
            const accounts = await brokerageRepository.find();
            res.status(200).json(accounts);
        })
        .post(async (req, res, next) => {
            const account = await brokerageRepository.create();
            const results = await brokerageRepository.save(account);
            res.status(201).json(results);
        });
    /* Handling a specific user */
    router.route('/:id')
        .get(async (req, res, next) => {
            const user = await brokerageRepository.find({ where: { id: req.params.id}});
            res.status(200).json(user);
        })
        .put(async (req, res, next) => {
            const user = await brokerageRepository.find({ where: { id: req.params.id}})[0];
            brokerageRepository.merge(user, req.body);
            const results = await brokerageRepository.save(user);
            return res.status(200).send(results);
        })
        .delete(async (req, res, next) => {
            const results = await brokerageRepository.delete(req.params.id);
            return res.status(200).send(results);
        });
    return router;
}
