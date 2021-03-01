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
    })
});
