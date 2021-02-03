import {Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BrokerageAccount} from "./brokerage-account";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        type: "varchar"
    })
    created: string;
    @Column({
        type: "varchar"
    })
    firstName: string;
    @Column({
        type: "varchar"
    })
    lastName: string;
    @Column({
        type: "varchar"
    })
    role: string;
    @OneToMany(() => BrokerageAccount, brokerageAccount => brokerageAccount.user)
    brokerageAccounts: BrokerageAccount[];
    constructor() {
        this.created = new Date().toDateString();
    }
}
