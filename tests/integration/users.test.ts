import supertest from 'supertest';
import app from '../../src/app';
import { cleanDatabase, endConnection } from '../database/connection';
import { getUserByName } from '../database/users';

import { correctUser, incorrectUser } from '../factories/userFactory';

const agent = supertest(app);

afterAll(async () => {
    await cleanDatabase();
    endConnection();
});

describe('post /users', () => {
    const body = correctUser();

    beforeAll(async () => {
        await cleanDatabase();
    });

    it('returns 400 for incorrect body sent', async () => {
        const result = await agent.post('/users').send(incorrectUser());
        expect(result.status).toEqual(400);
    });

    it('returns 200 for correct user and a token', async () => {
        const result = await agent.post('/users').send(body);
        const user = await getUserByName(body.name);
        expect(result.status).toEqual(200);
        expect(result.body.token).toEqual(user.token);
    });

    it('returns 409 for already existent user', async () => {
        const result = await agent.post('/users').send(body);
        expect(result.status).toEqual(409);
    });
});
