import {EntityRepository, Repository} from "typeorm";
import {BankAccount} from "../../entities/bank-account";
import {BrokerageAccount} from "../../entities/brokerage-account";

@EntityRepository(BankAccount)
export class BankAccountRepository extends Repository<BankAccount> {
    async createAndSave(
        brokerageAccount: BrokerageAccount,
        bankAccount: BankAccount
    ): Promise<number> {
        const _bankAccount = this.create();
        _bankAccount.accountNumber = bankAccount.accountNumber;
        _bankAccount.routingNumber = bankAccount.routingNumber;
        _bankAccount.brokerageAccount = brokerageAccount;
        await this.manager.save(_bankAccount);
        return _bankAccount.id;
    }

    async getAllBankAccounts(): Promise<BankAccount[]> {
        return await this.find();
    }

    async getBankAccountById(bankId: number): Promise<BankAccount | undefined> {
        return await this.findOne({ where: { id: bankId }});
    }

    async getAllBankAccountsWithBrokerageId(brokerageId: number): Promise<BankAccount[] | undefined> {
        return await this.find({ where: { brokerageAccount: { id: brokerageId } }});
    }

    async getAllBankAccountsWithUserId(userId: number): Promise<BankAccount[] | undefined> {
        return await this.find({ where: { brokerageAccount: { user: { id: userId } }}});
    }

    async updateById(id: number, account: BankAccount): Promise<number> {
        // TODO: add validation here
        await this.manager.update(BankAccount, id, account);
        return id;
    }

    async removeById(id: number) {
        await this.manager.delete(BankAccount, id);
    }
}
