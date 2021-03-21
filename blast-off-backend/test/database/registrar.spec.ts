import {connect, connected, getUserRepository} from "../../src/database/registrar";
import * as typeorm from 'typeorm';
import {Connection} from "typeorm";
import {UserRepository} from "../../src/database/repositories/user-repository";
import {get} from "http";

describe('Registrar', () => {
    let connectionSpy;

    beforeEach(() => {
        connectionSpy = jest.spyOn(typeorm, 'createConnection');
    });

    afterEach(() => {
        connectionSpy.mockRestore();
    })
    it('should not be connected on start', () => {
        expect(connected()).toBeFalsy();
    });
    it('should be connected after connect', async () => {
        connectionSpy.mockReturnValue(Promise.resolve(true));
        await connect();
        expect(connected()).toBeTruthy();
    });

    it('should throw since not connected', () => {
        expect(getUserRepository()).toThrowError();
    });

    it('should return truthy since connected', async () => {
        const getRepoSpy = jest.spyOn(typeorm, 'getCustomRepository');
        connectionSpy.mockReturnValue(Promise.resolve(true));
        getRepoSpy.mockReturnValue(new UserRepository());
        await connect();
        expect(getUserRepository()).toBeTruthy();
        getRepoSpy.mockRestore();
    });
})