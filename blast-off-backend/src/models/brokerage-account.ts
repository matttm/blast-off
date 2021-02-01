/**
 * This class is meant to be an asset held by
 * a user, where a user can have multiple accounts
 */
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BankAccount} from "./bank-account";
import {Position} from "./position";

@Entity()
export class BrokerageAccount {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        type: "date"
    })
    created: string;
    @Column({
        type: "int"
    })
    buyingPower: number;
    @OneToMany(() => BankAccount, bankAccount => bankAccount.brokerageAccount)
    bankAccounts: BankAccount[];
    @OneToMany(() => Position, position => position.brokerageAccount)
    positions: Position[];

    constructor() {
        this.created = new Date().toDateString();
        this.buyingPower = 0;
    }
}
