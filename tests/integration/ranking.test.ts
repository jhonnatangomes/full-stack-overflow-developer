import supertest from 'supertest';
import app from '../../src/app';

import { cleanDatabase, endConnection } from '../database/connection';
import { nameFactory } from '../factories/userFactory';
import { createAnsweredQuestion } from '../factories/questionFactory';

const agent = supertest(app);

afterAll(async () => {
    await cleanDatabase();
    endConnection();
});

describe('get /ranking', () => {
    let name: string = nameFactory();
    let name2: string = nameFactory();
    let name3: string = nameFactory();

    beforeAll(async () => {
        await cleanDatabase();
        await createAnsweredQuestion(name);
        await createAnsweredQuestion(name);
        await createAnsweredQuestion(name2);
        await createAnsweredQuestion(name2);
        await createAnsweredQuestion(name2);
        await createAnsweredQuestion(name3);
    });

    it('returns 200 and an ordered ranking', async () => {
        const ranking = [
            {
                name: name2,
                answers: 3,
            },
            {
                name: name,
                answers: 2,
            },
            {
                name: name3,
                answers: 1,
            },
        ];

        const result = await agent.get('/ranking');
        expect(result.status).toEqual(200);
        expect(result.body).toEqual(ranking);
    });
});

describe('get /ranking/weighted', () => {
    let name: string = nameFactory();
    let name2: string = nameFactory();
    let name3: string = nameFactory();

    beforeAll(async () => {
        await cleanDatabase();
        await createAnsweredQuestion(name, 2);
        await createAnsweredQuestion(name, 2);
        await createAnsweredQuestion(name2);
        await createAnsweredQuestion(name2);
        await createAnsweredQuestion(name2);
        await createAnsweredQuestion(name3, 7);
    });

    it('returns 200 and an ordered ranking weighted by points', async () => {
        const ranking = [
            {
                name: name3,
                answers: 1,
                points: 7,
            },
            {
                name: name,
                answers: 2,
                points: 4,
            },
            {
                name: name2,
                answers: 3,
                points: 3,
            },
        ];

        const result = await agent.get('/ranking/weighted');
        expect(result.status).toEqual(200);
        expect(result.body).toEqual(ranking);
    });
});
