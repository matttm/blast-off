import {User} from "../../src/entities/user";

describe('User', () => {
    it('should create a User with a time created', () => {
        const user = new User();
        expect(user.username).toBeFalsy();
        expect(user.password).toBeFalsy();
        expect(user.firstName).toBeFalsy();
        expect(user.lastName).toBeFalsy();
        expect(user.role).toBeFalsy();
        expect(user.brokerageAccounts).toBeFalsy();
        expect(user.created).toBeTruthy();
    });

    it('should be modifiable', () => {
        const user = new User();
        const fname = 'Matt';
        const lname = 'Maloney';
        const uname = 'matttm';
        const pword = 'password';
        user.firstName = fname;
        user.lastName = lname;
        user.username = uname;
        user.password = pword;
        expect(user.firstName).toBe(fname);
        expect(user.lastName).toBe(lname);
        expect(user.username).toBe(uname);
        expect(user.password).toBe(pword);
    })
});
