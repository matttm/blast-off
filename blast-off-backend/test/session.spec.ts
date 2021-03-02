import {initRoute} from './test-utilities';
import sessionRouter from '../src/routes/session';

describe('Session Router', () => {
    let request;
    beforeAll(() => {
        request = initRoute(sessionRouter);
    });

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
});
