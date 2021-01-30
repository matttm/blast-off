/**
 * This class is meant to be an asset held by
 * a user, where a user can have multiple accounts
 */
class BrokerageAccount {
    constructor(id, bankAccounts, balance, positions) {
        this.id = id;
        this.bankAccounts = bankAccounts;
        this.balance = balance;
        this.positions = positions;
    }
}

module.exports = {
    BrokerageAccount
};
