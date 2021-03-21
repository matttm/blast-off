import {connect, connected, getUserRepository} from "../../src/database/registrar";

describe('Registrar', () => {
    it('should not be connected on start', () => {
        expect(connected()).toBeFalsy();
    });
    it('should be connected after connect', async () => {
        await connect();
        expect(connected()).toBeTruthy();
    });

    it('should throw since not connected', async () => {
        expect(getUserRepository()).toThrowError();
    });

    it('should return truthy since connected', async () => {
        await connect();
        expect(getUserRepository()).toBeTruthy();
    });
})