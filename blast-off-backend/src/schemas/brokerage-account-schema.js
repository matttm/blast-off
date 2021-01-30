const {Position} = require("../models/position");
const {BankAccount} = require("../models/bank-account");
const {BrokerageAccount} = require("../models/brokerage-account");
const {EntitySchema} = require("typeorm");

module.exports = EntitySchema({
    name: "BrokerageAccount",
    target: BrokerageAccount,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        created: {
            type: "date"
        },
        buyingPower: {
            type: "int"
        }
    },
    relations: {
        bankAccounts: {
            target: BankAccount,
            type: "one-to-many",
            joinTable: true,
            cascade: true
        },
        positions: {
            target: Position,
            type: "one-to-many",
            joinTable: true,
            cascade: true
        }
    }
});
