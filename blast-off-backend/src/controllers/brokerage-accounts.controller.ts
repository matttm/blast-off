import {BrokerageAccount} from "../entities/brokerage-account";
import {getBrokerageAccountRepository, getUserRepository} from "../database/registrar";

export default class BrokerageAccountsController {

    private userRepository = getUserRepository();
    private brokerageRepository = getBrokerageAccountRepository();

    /* GET users listing. */
    async getBrokerAccounts(req, res, next) {
        const userId = parseInt(req.params.userId);
        const accounts = await this.brokerageRepository.getAllBrokerageAccountsWithUserId(userId);
        res.status(200).json(accounts);
    }

    async createBrokerageAccount(req, res, next) {
        const userId = parseInt(req.params.userId);
        const account = new BrokerageAccount();
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            // TODO:  check status
            res.status(422).send();
            return;
        }
        const results = await this.brokerageRepository.createAndSave(user, account);
        res.status(201).json(results);
    }

    async getBrokerageAccount(req, res, next) {
        const id = parseInt(req.params.brokerageId);
        const user = await this.brokerageRepository.getBrokerageAccountById(id);
        res.status(200).json(user);
    }

    async updateBrokerageAccount(req, res, next) {
        const id = parseInt(req.params.brokerageId);
        const results = await this.brokerageRepository.updateById(id, req.body);
        return res.status(200).send(results);
    }

    async deleteBrokerageAccount(req, res, next) {
        const id = parseInt(req.params.brokerageId);
        const results = await this.brokerageRepository.removeById(id);
        return res.status(200).send(results);
    }
}
