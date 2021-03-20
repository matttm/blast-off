import {Connection, createConnection, Repository} from "typeorm";
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
    return getRepositoryIfConnected(UserRepository);
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

function getRepositoryIfConnected(repo): Repository<any> {
    if (connected()) {
        return _connection.getCustomRepository(repo);
    } else {
        throw new Error('Database is not connected');
    }
}