/**
 * Currently the only supported position type is 'stock',
 * so 'quantity' refers to shares
 */
class Position {
    constructor(id, symbol, type, quantity, priceAtPurchase) {
        this.id = id;
        this.symbol = symbol;
        this.type = type;
        this.quantity = quantity;
        this.priceAtPurchase = priceAtPurchase;
    }
}

module.exports = {
    Position
};
