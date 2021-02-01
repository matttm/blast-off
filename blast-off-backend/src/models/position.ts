/**
 * Currently the only supported position type is 'stock',
 * so 'quantity' refers to shares
 */
import {Column, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BrokerageAccount} from "./brokerage-account";

export class Position {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        type: "varchar"
    })
    created: string;
    @Column({
        type: "varchar",
        length: 4
    })
    symbol: string;
    @Column({
        type: "enum"
    })
    type: string;
    @Column()
    quantity: number;
    @ManyToOne(() => BrokerageAccount, brokerageAccount => brokerageAccount.positions)
    brokerageAccount: BrokerageAccount;
    constructor() {
        this.created = new Date().toDateString();
        this.quantity = 0;
    }
}
