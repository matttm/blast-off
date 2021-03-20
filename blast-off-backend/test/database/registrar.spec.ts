import {connect, connected} from "../../src/database/registrar";

describe('Registrar', () => {
    it('should not be connected on start', () => {
        expect(connected()).toBeFalsy();
    });
    it('should be connected after connect', async () => {
        await connect();
        expect(connected()).toBeTruthy();
    });
})