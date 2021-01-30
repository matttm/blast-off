const EntitySchema = require("typeorm");
const {BrokerageAccount} = require("../models/brokerage-account");
const {User} = require("../models/user");

module.exports = EntitySchema({
    name: "User",
    target: User,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        created: {
            type: "date"
        },
        role: {
            type: "enum"
        },
        firstName: {
            type: "varchar"
        },
        lastName: {
            type: "varchar"
        }
    },
    relations: {
        brokerageAccounts: {
            target: BrokerageAccount,
            type: "one-to-many",
            joinTable: true,
            cascade: true
        }
    }
});
