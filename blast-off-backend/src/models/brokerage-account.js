/**
 * This class is meant to be an asset held by
 * a user, where a user can have multiple accounts
 */
class BrokerageAccount {
    constructor(id, bankAccounts, buyingPower, positions) {
        this.id = id;
        this.created = new Date().toDateString();
        this.bankAccounts = bankAccounts;
        this.buyingPower = buyingPower;
        this.positions = positions;
    }
}

module.exports = {
    BrokerageAccount
};
