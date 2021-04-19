import {BrokerageAccount} from "../../src/entities/brokerage-account";

describe('Brokerage Account', () => {
    it('should have populated fields on construction', () => {
        const account = new BrokerageAccount();
        expect(account.bankAccounts).toBeFalsy();
        expect(account.positions).toBeFalsy();
        expect(account.user).toBeFalsy();
        expect(account.created).toBeTruthy();
        expect(account.buyingPower).toBe(0);
    });
});
