import {Connection, createConnection, ObjectType} from "typeorm";
import {UserRepository} from "./repositories/user-repository";
import {BrokerageAccountRepository} from "./repositories/brokerage-account-repository";
import {BankAccountRepository} from "./repositories/bank-account-repository";
import {PositionRepository} from "./repositories/position-repository";

let _connection: Connection | null = null;

export async function connect() {
    if (!connected()) {
        _connection = await createConnection();
    }
}

export async function disconnect() {
    if (connected()) {
        // @ts-ignore
        await _connection.close();
        _connection = null;
    }
}

export function connected(): boolean {
    return _connection !== null;
}

export function getUserRepository(): UserRepository {
    return getRepositoryIfConnected(UserRepository) as UserRepository;
}

export function getBrokerageAccountRepository(): BrokerageAccountRepository {
    return getRepositoryIfConnected(BrokerageAccountRepository) as BrokerageAccountRepository
}

export function getBankAccountRepository(): BankAccountRepository {
    return getRepositoryIfConnected(BankAccountRepository) as BankAccountRepository;
}

export function getPositionRepository(): PositionRepository {
    return getRepositoryIfConnected(PositionRepository) as PositionRepository;
}

function getRepositoryIfConnected<T>(repo: ObjectType<T>): T {
    if (connected()) {
        // @ts-ignore
        return _connection.getCustomRepository(repo);
    } else {
        throw new Error('Database is not connected');
    }
}