import supertest from "supertest";
import app from "../../src/app";
import { getQuestionById } from "../database/questions";

import { correctQuestion, incorrectQuestion } from "../factories/questionFactory";

const agent = supertest(app);

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
    })
})