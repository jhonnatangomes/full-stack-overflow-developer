import supertest from 'supertest';
import app from '../../src/app';
import { Question } from '../../src/interfaces/QuestionsInterface';
import User from '../../src/interfaces/UserInterface';
import { cleanDatabase, endConnection } from '../database/connection';
import { getQuestionById } from '../database/questions';

import {
    correctQuestion,
    createAnsweredQuestion,
    createUnansweredQuestion,
    incorrectQuestion,
} from '../factories/questionFactory';
import {
    createUser,
    stringFactory,
    tokenFactory,
} from '../factories/userFactory';

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

describe('post /questions/:id', () => {
    const incorrectToken: string = tokenFactory();
    const answer: string = stringFactory();
    let user: User;
    let question: Question;

    beforeAll(async () => {
        await cleanDatabase();
    });

    it('returns 401 for no token sent', async () => {
        const result = await agent.post('/questions/1');
        expect(result.status).toEqual(401);
    });

    it('returns 401 for non-uuid token', async () => {
        const result = await agent
            .post('/questions/1')
            .set('Authorization', `Bearer ${stringFactory()}`);
        expect(result.status).toEqual(401);
    });

    it('returns 400 for no answer provided', async () => {
        const result = await agent
            .post('/questions/1')
            .set('Authorization', `Bearer ${incorrectToken}`);
        expect(result.status).toEqual(400);
    });

    it('returns 404 for no user corresponding to token', async () => {
        const result = await agent
            .post('/questions/1')
            .set('Authorization', `Bearer ${incorrectToken}`)
            .send({ answer });
        expect(result.status).toEqual(404);
    });

    it('returns 404 when question doesnt exist', async () => {
        user = await createUser();
        const result = await agent
            .post('/questions/1')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ answer });
        expect(result.status).toEqual(404);
    });

    it('returns 409 when question is already answered', async () => {
        question = await createAnsweredQuestion();
        const result = await agent
            .post(`/questions/${question.id}`)
            .set('Authorization', `Bearer ${user.token}`)
            .send({ answer });
        expect(result.status).toEqual(409);
    });

    it('returns 200 and the answer sent', async () => {
        question = await createUnansweredQuestion();
        const result = await agent
            .post(`/questions/${question.id}`)
            .set('Authorization', `Bearer ${user.token}`)
            .send({ answer });
        expect(result.status).toEqual(200);
        expect(result.body.answer).toEqual(answer);
    });
});

describe('get /questions', () => {
    let question: Question;

    beforeAll(async () => {
        await cleanDatabase();
        question = await createUnansweredQuestion();
        await createUnansweredQuestion();
        await createUnansweredQuestion();
    });

    it('returns 200 and an array of unanswered questions', async () => {
        const result = await agent.get('/questions');
        expect(result.status).toEqual(200);
        expect(result.body.length).toEqual(3);
        expect(result.body[0].id).toEqual(question.id);
        expect(result.body[0].question).toEqual(question.question);
        expect(result.body[0].student).toEqual(question.student);
        expect(result.body[0].class).toEqual(question.class);
        expect(result.body[0].submittedAt).toEqual(question.submittedAt);
    });
});
