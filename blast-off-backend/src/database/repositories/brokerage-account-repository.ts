import {EntityRepository, Repository} from "typeorm";
import {BrokerageAccount} from "../../entities/brokerage-account";

@EntityRepository(BrokerageAccount)
export class BrokerageAccountRepository extends Repository<BrokerageAccount> {
    async createAndSave(account: BrokerageAccount): Promise<number> {
        const _account = new BrokerageAccount();
        // all initialization should've been done in the constructor
        await this.save(_account);
        return _account.id;
    }

    async getAllBrokerageAccounts(): Promise<BrokerageAccount[]> {
        return await this.find();
    }

    async getAllBrokerageAccountsWithUserId(userId: number): Promise<BrokerageAccount[] | undefined> {
        return await this.find({ where: { user: { id: userId }}});
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
