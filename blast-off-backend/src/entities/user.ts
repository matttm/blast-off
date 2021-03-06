import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
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
    username: string;
    @Column({
        type: "varchar"
    })
    password: string;
    @Column({
        type: "varchar"
    })
    lastName: string;
    @Column({
        type: "varchar"
    })
    role: string;
    @OneToMany(() => BrokerageAccount, brokerageAccount => brokerageAccount.user, {
        nullable: true
    })
    brokerageAccounts: BrokerageAccount[];
    constructor() {
        this.created = new Date().toDateString();
    }
}
