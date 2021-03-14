import {Connection, createConnection} from "typeorm";
import {UserRepository} from "./repositories/user-repository";
import {BrokerageAccountRepository} from "./repositories/brokerage-account-repository";
import {BankAccountRepository} from "./repositories/bank-account-repository";
import {PositionRepository} from "./repositories/position-repository";

let _connection: Connection;

export async function connect() {
    if (!connected()) {
        _connection = await createConnection();
    }
}

export function connected(): boolean {
    return typeof _connection !== 'undefined';
}
export function getUserRepository(): UserRepository {
    return _connection.getCustomRepository(UserRepository);
}

export function getBrokerageAccountRepository(): BrokerageAccountRepository {
    return _connection.getCustomRepository(BrokerageAccountRepository)
}

export function getBankAccountRepository(): BankAccountRepository {
    return _connection.getCustomRepository(BankAccountRepository);
}

export function getPositionRepository(): PositionRepository {
    return _connection.getCustomRepository(PositionRepository);
}
