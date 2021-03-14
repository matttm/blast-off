import {EntityRepository, Repository} from "typeorm";
import {BrokerageAccount} from "../../entities/brokerage-account";
import {User} from "../../entities/user";

@EntityRepository(BrokerageAccount)
export class BrokerageAccountRepository extends Repository<BrokerageAccount> {
    async createAndSave(user: User, account: BrokerageAccount): Promise<number> {
        const _account = this.create();
        // all initialization should've been done in the constructor
        _account.user = user;
        await this.manager.save(_account);
        return _account.id;
    }

    async getAllBrokerageAccounts(): Promise<BrokerageAccount[]> {
        return await this.find();
    }

    async getAllBrokerageAccountsWithUserId(userId: number): Promise<BrokerageAccount[] | undefined> {
        return await this.find({ where: { user: { id: userId }}});
    }

    async getBrokerageAccountById(brokerageId: number): Promise<BrokerageAccount | undefined> {
        return await this.findOne({ where: { id: brokerageId }});
    }

    async updateById(id: number, account: BrokerageAccount): Promise<number> {
        // TODO: add validation here
        await this.manager.update(BrokerageAccount, id, account);
        return id;
    }

    async removeById(id: number) {
        await this.manager.delete(BrokerageAccount, id);
    }
}
