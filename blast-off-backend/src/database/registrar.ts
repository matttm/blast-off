import {Connection, createConnection, ObjectType} from "typeorm";
import {UserRepository} from "./repositories/user-repository";
import {BrokerageAccountRepository} from "./repositories/brokerage-account-repository";
import {BankAccountRepository} from "./repositories/bank-account-repository";
import {PositionRepository} from "./repositories/position-repository";

let _connection: Connection | null = null;

/**
 * Establishes connection to database if not already
 * connected
 *
 * @return void
 */
export async function connect(): Promise<void> {
    if (!isConnected()) {
        _connection = await createConnection();
    }
}

/**
 * Disconnects from database if connected
 *
 * @return void
 */
export async function disconnect(): Promise<void> {
    if (isConnected()) {
        // @ts-ignore
        await _connection.close();
        _connection = null;
    }
}

/**
 * Determines if connected to database
 *
 * @return true if connected to database, false ow
 */
export function isConnected(): boolean {
    return _connection !== null;
}

/**
 * Gets repository if connected, otherwise throws error
 *
 * @throws error if not connected
 * @return repository if connected
 */
export function getUserRepository(): UserRepository {
    return getRepositoryIfConnected(UserRepository) as UserRepository;
}

/**
 * Gets repository if connected, otherwise throws error
 *
 * @throws error if not connected
 * @return repository if connected
 */
export function getBrokerageAccountRepository(): BrokerageAccountRepository {
    return getRepositoryIfConnected(BrokerageAccountRepository) as BrokerageAccountRepository
}

/**
 * Gets repository if connected, otherwise throws error
 *
 * @throws error if not connected
 * @return repository if connected
 */
export function getBankAccountRepository(): BankAccountRepository {
    return getRepositoryIfConnected(BankAccountRepository) as BankAccountRepository;
}

/**
 * Gets repository if connected, otherwise throws error
 *
 * @throws error if not connected
 * @return repository if connected
 */
export function getPositionRepository(): PositionRepository {
    return getRepositoryIfConnected(PositionRepository) as PositionRepository;
}

/**
 * Gets repository if connected, otherwise throws error
 *
 * @param repo the desired repository (database table)
 * @throws error if not connected
 * @return repository if connected
 */
function getRepositoryIfConnected<T>(repo: ObjectType<T>): T {
    if (isConnected()) {
        // @ts-ignore
        return _connection.getCustomRepository(repo);
    } else {
        throw new Error('Database is not connected');
    }
}