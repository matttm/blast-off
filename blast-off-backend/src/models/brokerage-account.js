/**
 * This class is meant to be an asset held by
 * a user, where a user can have multiple accounts
 */
class BrokerageAccount {
    constructor(id, created, bankAccounts, balance, positions) {
        this.id = id;
        this.created = created;
        this.bankAccounts = bankAccounts;
        this.balance = balance;
        this.positions = positions;
    }
}

module.exports = {
    BrokerageAccount
};
