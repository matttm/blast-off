import {Connection, createConnection} from "typeorm";
import {UserRepository} from "./repositories/UserRepository";

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

