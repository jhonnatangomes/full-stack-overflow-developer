import supertest from 'supertest';
import app from '../../src/app';
import { cleanDatabase, endConnection } from '../database/connection';
import { getQuestionById } from '../database/questions';

import {
    correctQuestion,
    createAnsweredQuestion,
    createUnansweredQuestion,
    incorrectQuestion,
} from '../factories/questionFactory';

const agent = supertest(app);

afterAll(async () => {
    await cleanDatabase();
    endConnection();
});

describe('post /questions', () => {
    it('returns 400 for incorrect body sent', async () => {
        const body = incorrectQuestion();
        const result = await agent.post('/questions').send(body);
        expect(result.status).toEqual(400);
    });

    it('returns 200 and a question id', async () => {
        const body = correctQuestion();
        const result = await agent.post('/questions').send(body);
        const question = await getQuestionById(result.body.id);
        expect(result.status).toEqual(200);
        expect(result.body.id).toEqual(question.id);
    });
});

describe('get /questions/:id', () => {
    beforeAll(async () => {
        await cleanDatabase();
    });

    it('returns 404 for non-existent question in database', async () => {
        const result = await agent.get('/questions/1');
        expect(result.status).toEqual(404);
    });

    it('returns 200 and an unanswered question', async () => {
        const question = await createUnansweredQuestion();
        const result = await agent.get(`/questions/${question.id}`);
        delete question.id;
        expect(result.status).toEqual(200);
        expect(result.body).toEqual(question);
    });

    it('returns 200 and an answered question', async () => {
        const question = await createAnsweredQuestion();
        const result = await agent.get(`/questions/${question.id}`);
        delete question.id;
        expect(result.status).toEqual(200);
        expect(result.body).toEqual(question);
    });
});
