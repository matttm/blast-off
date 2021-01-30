/**
 * This class is meant to be an asset held by
 * a user, where a user can have multiple accounts
 */
class BrokerageAccount {
    constructor(id, created, bankAccounts, buyingPower, positions) {
        this.id = id;
        this.created = created;
        this.bankAccounts = bankAccounts;
        this.buyingPower = buyingPower;
        this.positions = positions;
    }
}

module.exports = {
    BrokerageAccount
};
