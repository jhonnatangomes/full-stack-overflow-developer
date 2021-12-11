import supertest from 'supertest';
import app from '../../src/app';
import dayjs from 'dayjs';
import { cleanDatabase, endConnection } from '../database/connection';
import { getQuestionById } from '../database/questions';

import {
    correctQuestion,
    createAnsweredQuestion,
    createUnansweredQuestion,
    incorrectQuestion,
} from '../factories/questionFactory';

const agent = supertest(app);

afterAll(() => {
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
    beforeAll(() => {
        cleanDatabase();
    });

    it('returns 404 for non-existent question in database', async () => {
        const result = await agent.get('/questions/1');
        expect(result.status).toEqual(404);
    });

    it('returns 200 and an unanswered question', async () => {
        const question = await createUnansweredQuestion();
        const result = await agent.get(`/questions/${question.id}`);
        expect(result.status).toEqual(200);
        expect(result.body.question).toEqual(question.question);
        expect(result.body.student).toEqual(question.student);
        expect(result.body.class).toEqual(question.class);
        expect(result.body.tags).toEqual(question.tags);
        expect(result.body.answered).toEqual(question.answered);
        expect(result.body.submittedAt).toEqual(
            dayjs(question.submittedAt).format('YYYY-MM-DD HH:mm')
        );
    });

    it('returns 200 and an answered question', async () => {
        const question = await createAnsweredQuestion();
        const result = await agent.get(`/questions/${question.id}`);
        expect(result.status).toEqual(200);
        expect(result.body.question).toEqual(question.question);
        expect(result.body.student).toEqual(question.student);
        expect(result.body.class).toEqual(question.class);
        expect(result.body.tags).toEqual(question.tags);
        expect(result.body.answered).toEqual(question.answered);
        expect(result.body.submittedAt).toEqual(
            dayjs(question.submittedAt).format('YYYY-MM-DD HH:mm')
        );
        expect(result.body.answeredAt).toEqual(
            dayjs(question.answeredAt).format('YYYY-MM-DD HH:mm')
        );
        expect(result.body.answeredBy).toEqual(question.answeredBy);
        expect(result.body.answer).toEqual(question.answer);
    });
});
