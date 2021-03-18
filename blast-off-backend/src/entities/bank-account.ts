import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BrokerageAccount} from "./brokerage-account";

@Entity()
export class BankAccount {
    @PrimaryGeneratedColumn()
    id: number;
    // TODO: change these to strings do there can be leading zeros
    // TODO: add created field?
    @Column()
    accountNumber: number;
    @Column()
    routingNumber: number;
    @ManyToOne(() => BrokerageAccount, brokerageAccount => brokerageAccount.bankAccounts)
    brokerageAccount: BrokerageAccount;
    constructor() {}
}
