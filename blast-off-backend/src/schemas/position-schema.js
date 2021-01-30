const {Position} = require("../models/position");
const {EntitySchema} = require("typeorm");

module.exports = EntitySchema({
    name: "Position",
    target: Position,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        created: {
            type: "date"
        },
        symbol: {
            type: "varchar"
        },
        type: {
            type: "enum"
        },
        quantity: {
            type: "int"
        }
    }
});
