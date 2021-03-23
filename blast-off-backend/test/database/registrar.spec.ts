import {connect, connected, getUserRepository, disconnect} from "../../src/database/registrar";
import * as typeorm from 'typeorm';
import {Connection} from "typeorm";
import {UserRepository} from "../../src/database/repositories/user-repository";
import {get} from "http";

describe('Registrar', () => {
    let connectionSpy;

    beforeEach(() => {
        connectionSpy = jest.spyOn(typeorm, 'createConnection');
        connectionSpy.mockReturnValue(Promise.resolve({
            getCustomRepository: jasmine.createSpy().and.returnValue(true),
            close: jasmine.createSpy().and.returnValue(true)
        }));
    });

    afterEach(() => {
        disconnect();
        connectionSpy.mockRestore();
    });

    it('should not be connected on start', () => {
        expect(connected()).toBeFalsy();
    });

    it('should be connected after connect', async () => {
        await connect();
        expect(connected()).toBeTruthy();
        await disconnect();
        expect(connected()).toBeFalsy();
    });

    it('should throw since not connected', () => {
        expect(getUserRepository).toThrowError();
    });

    it('should return truthy since connected', async () => {
        await connect();
        expect(getUserRepository()).toBeTruthy();
    });
})