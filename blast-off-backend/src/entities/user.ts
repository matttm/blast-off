import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BrokerageAccount} from "./brokerage-account";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        type: "date"
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
    @Column()
    role: string;
    @OneToMany(() => BrokerageAccount, brokerageAccount => brokerageAccount.user)
    brokerageAccounts: BrokerageAccount[];
    constructor() {
        this.created = new Date().toDateString();
    }
}
