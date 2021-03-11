import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BrokerageAccount} from "./brokerage-account";

@Entity()
export class BankAccount {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    accountNumber: number;
    @Column()
    routingNumber: number;
    @ManyToOne(() => BrokerageAccount, brokerageAccount => brokerageAccount.bankAccounts)
    brokerageAccount: BrokerageAccount;
    constructor() {}
}
