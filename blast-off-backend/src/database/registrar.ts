import {Connection, createConnection} from "typeorm";
import {UserRepository} from "./repositories/user-repository";
import {BrokerageAccountRepository} from "./repositories/brokerage-account-repository";

let  _connection: Connection;

export async function connect(databaseFN: string) {
    _connection = await createConnection();
}
export function connected() {
    return typeof _connection !== 'undefined';
}
export function getUserRepository(): UserRepository {
    return _connection.getCustomRepository(UserRepository);
}

export function getNrokerageAccountRepository(): BrokerageAccountRepository {
    return _connection.getCustomRepository(BrokerageAccountRepository)
}
