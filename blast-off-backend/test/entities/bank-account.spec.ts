import {BankAccount} from "../../src/entities/bank-account";

describe('Bank Account', () => {
    it('should create a BankAccount with a time created', () => {
        const account = new BankAccount();
        expect(account.accountNumber).toBeFalsy();
        expect(account.routingNumber).toBeFalsy();
        expect(account.brokerageAccount).toBeFalsy();
    });

    it('should be modifiable', () => {
        const user = new BankAccount();
        const accountNumber = 6372474837;
        const routingNumber = 201029;
        user.accountNumber = accountNumber;
        user.routingNumber = routingNumber;
        expect(user.accountNumber).toBe(accountNumber);
        expect(user.routingNumber).toBe(routingNumber);
    })
});
