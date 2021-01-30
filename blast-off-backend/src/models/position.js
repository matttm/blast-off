/**
 * Currently the only supported position type is 'stock',
 * so 'quantity' refers to shares
 */
class Position {
    constructor(id, symbol, type, quantity) {
        this.id = id;
        this.created = new Date().toDateString();
        this.symbol = symbol;
        this.type = type;
        this.quantity = quantity;
    }
}

module.exports = {
    Position
};
