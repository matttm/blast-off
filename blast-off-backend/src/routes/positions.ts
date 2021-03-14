import express from "express";
import {
    getBankAccountRepository,
    getBrokerageAccountRepository,
    getPositionRepository,
    getUserRepository
} from "../database/registrar";
import {BankAccount} from "../entities/bank-account";
import {Position} from "../entities/position";

const router = express.Router({ mergeParams: true });

export default async function getPositionsRouter() {
    const userRepository = getUserRepository();
    const brokerageRepository =  getBrokerageAccountRepository();
    const positionRepository = getPositionRepository();
    /* GET users listing. */
    router.route('/')
        .get(async (req, res, next) => {
            const userId = parseInt(req.params.userId);
            const brokerageId = parseInt(req.params.brokerageId);
            const accounts = await positionRepository.getAllPositionsWithUserIdBrokerageId(userId, brokerageId);
            res.status(200).json(accounts);
        })
        .post(async (req, res, next) => {
            const userId = parseInt(req.params.userId);
            const brokerageId = parseInt(req.params.brokerageId);
            const  brokerAccount = await brokerageRepository.getBrokerageAccountById(brokerageId);
            if (!brokerAccount) {
                // TODO:  check status
                res.status(422).send();
                return;
            }
            const position = new Position();
            const {
                symbol,
                type,
                quantity
            } = req.body;
            // TODO: VALIDATE
            position.symbol = symbol;
            position.type = type;
            position.quantity = quantity;
            const results = await positionRepository.createAndSave(brokerAccount, position);
            res.status(201).json(results);
        });
    /* Handling a specific user */
    router.route('/:positionId')
        .get(async (req, res, next) => {
            const id = parseInt(req.params.positionId);
            const user = await positionRepository.getAllPositionById(id);
            res.status(200).json(user);
        })
        .put(async (req, res, next) => {
            const id = parseInt(req.params.positionId);
            const results = await positionRepository.updateById(id, req.body);
            return res.status(200).send(results);
        })
        .delete(async (req, res, next) => {
            const id = parseInt(req.params.positionId);
            const results = await positionRepository.removeById(id);
            return res.status(200).send(results);
        });
    return router;
}
