import {getBrokerageAccountRepository, getPositionRepository, getUserRepository} from "../database/registrar";
import {Position} from "../entities/position";


export default class PositionsController {
    private userRepository = getUserRepository();
    private brokerageRepository =  getBrokerageAccountRepository();
    private positionRepository = getPositionRepository();
    /* GET users listing. */
        async getPositions(req, res, next) {
            const userId = parseInt(req.params.userId);
            const brokerageId = parseInt(req.params.brokerageId);
            const accounts = await this.positionRepository.getAllPositionsWithUserIdBrokerageId(userId, brokerageId);
            res.status(200).json(accounts);
        }

        async createPosition(req, res, next) {
            const userId = parseInt(req.params.userId);
            const brokerageId = parseInt(req.params.brokerageId);
            const  brokerAccount = await this.brokerageRepository.getBrokerageAccountById(brokerageId);
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
            const results = await this.positionRepository.createAndSave(brokerAccount, position);
            res.status(201).json(results);
        }


        async getPosition(req, res, next) {
            const id = parseInt(req.params.positionId);
            const user = await this.positionRepository.getAllPositionById(id);
            res.status(200).json(user);
        }

        async updateOisition(req, res, next) {
            const id = parseInt(req.params.positionId);
            const results = await this.positionRepository.updateById(id, req.body);
            return res.status(200).send(results);
        }

        async deletePosition(req, res, next) {
            const id = parseInt(req.params.positionId);
            const results = await this.positionRepository.removeById(id);
            return res.status(200).send(results);
        }
}
