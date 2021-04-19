import {connect, isConnected, getUserRepository, disconnect} from "../../src/database/registrar";
import * as typeorm from 'typeorm';

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
        expect(isConnected()).toBeFalsy();
    });

    it('should not be affected without connecting first', () => {
        disconnect();
        expect(isConnected()).toBeFalsy();
    });

    it('should be connected after connect and disconnected after disconnect', async () => {
        await connect();
        expect(isConnected()).toBeTruthy();
        await disconnect();
        expect(isConnected()).toBeFalsy();
    });

    it('should throw since not connected', () => {
        expect(getUserRepository).toThrowError();
    });

    it('should return repository since connected', async () => {
        await connect();
        expect(getUserRepository()).toBeTruthy();
    });
})