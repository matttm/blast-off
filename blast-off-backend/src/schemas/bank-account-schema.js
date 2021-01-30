const {BankAccount} = require("../models/bank-account");
const {EntitySchema} = require("typeorm");

module.exports = EntitySchema({
    name: "BankAccount",
    target: BankAccount,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        accountNumber: {
            type: "varchar"
        },
        routingNumber: {
            type: "varchar"
        }
    }
});
