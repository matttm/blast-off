module.exports = {
    name: "User",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "string"
        }
    },
    relations: {
        positions: {
            target: "Position",
            type: "many-to-many",
            joinTable: true,
            cascade: true
        }
    }
};
