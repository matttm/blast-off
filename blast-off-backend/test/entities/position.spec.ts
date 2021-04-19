import {Position} from "../../src/entities/position";

describe('Position', () => {
    it('should create a Position with a time created', () => {
        const position = new Position();
        expect(position.symbol).toBeFalsy();
        expect(position.type).toBeFalsy();
        expect(position.quantity).toBeFalsy();
        expect(position.brokerageAccount).toBeFalsy();
        expect(position.created).toBeTruthy();
    });

    it('should be modifiable', () => {
        const position = new Position();
        const symbol = 'MVIS';
        const type = 'share';
        const quantity = 20;
        position.symbol = symbol;
        position.type = type;
        position.quantity = quantity;
        expect(position.symbol).toBe(symbol);
        expect(position.type).toBe(type);
        expect(position.quantity).toBe(quantity);
    })
});
