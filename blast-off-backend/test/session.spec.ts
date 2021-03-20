import {initRoute} from './test-utilities';
import sessionRouter from '../src/routes/session';
import * as registrar from '../src/database/registrar';
import {roles} from '../src/enums';

describe('Session Router', () => {
    let userRepositorySpy;
    let registrarSpy;
    const testUser = {
        id: 1,
        username: 'jerry',
        password: 'test',
        role: roles.ADMINISTRATOR
    };
    const promisedUnd = Promise.resolve(undefined);
    const promisedUser = Promise.resolve(testUser);
    let request;
    beforeAll(() => {
        userRepositorySpy = jasmine.createSpyObj('UserRepository', ['getUserByCredentials']);
        registrarSpy = jest.spyOn(registrar, 'getUserRepository').mockReturnValue(userRepositorySpy);
        request = initRoute(sessionRouter);
    });

    afterAll(() => {
        registrarSpy.mockRestore();
    })

    test('should return a 422 on a POST request without credentials', async () => {
        const response = await request
            .post('/')
            .send();
        expect(response.status).toBe(422);
    });

    test('should return a 422 due to empty username', async () => {
        const response = await request
            .post('/')
            .send({
                username: '',
                password: 'test'
            });
        expect(response.status).toBe(422);
    });

    test('should return a 422 due to empty password', async () => {
        const response = await request
            .post('/')
            .send({
                username: 'test',
                password: ''
            });
        expect(response.status).toBe(422);
    });

    test('should return 401 when user doesn\'t exist', async () => {
        userRepositorySpy.gdtUserByCredentials.and.returnValue(promisedUnd);
        const response = await request
            .post('/')
            .send({
                username: 'notfound',
                password: 'notfound'
            });
        expect(response.status).toBe(401);
    });

    test('should return 201 and a cookie when user does exist', async () => {
        userRepositorySpy.gdtUserByCredentials.and.returnValue(promisedUser);
        const response = await request
            .post('/')
            .send({
                username: testUser.username,
                password: testUser.password
            });
        expect(response.status).toBe(201);
    })
});
