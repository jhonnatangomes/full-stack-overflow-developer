import * as questionsServices from '../../src/services/questionsServices';
import * as questionsRepositories from '../../src/repositories/questionsRepositories';
import { Question } from '../../src/interfaces/QuestionsInterface';
import APIError from '../../src/errors/APIError';

const sut = questionsServices;

describe('post question', () => {
    const mockedQuestion: Question = {
        question: 'as',
        student: 'as',
        class: 'as',
        tags: 'as',
    };

    const mockedResponse: Question = {
        id: 1,
        ...mockedQuestion,
    };

    it('should post a question', async () => {
        jest.spyOn(questionsRepositories, 'postQuestion').mockImplementation(
            async () => mockedResponse
        );

        const result = await sut.postQuestion(mockedQuestion);
        expect(result).toEqual(mockedResponse.id);
    });
});

describe('get question by id', () => {
    const getQuestionById = jest.spyOn(
        questionsRepositories,
        'getQuestionById'
    );

    const answeredQuestion: Question = {
        question: 'Uki ta contecendo?',
        student: 'Zoru',
        class: 'T3',
        tags: 'typescript, vida, javascript, java?',
        answered: true,
        submittedAt: '2021-01-01 10:12',
        answeredAt: '2021-01-01 10:30',
        answeredBy: 'Vegeta',
        answer: 'É mais de 8 miiiil!',
    };

    const unansweredQuestion: Question = {
        ...answeredQuestion,
        answered: false,
    };

    it('throws error if the question doesnt exist', async () => {
        getQuestionById.mockImplementationOnce(() => null);
        const result = sut.getQuestionById(1);
        await expect(result).rejects.toThrow(APIError);
    });

    it('shows unanswered question for answered = false', async () => {
        getQuestionById.mockImplementationOnce(async () => unansweredQuestion);
        const result = await sut.getQuestionById(1);
        expect(result).not.toHaveProperty('answeredAt');
        expect(result).not.toHaveProperty('answeredBy');
        expect(result).not.toHaveProperty('answer');
    });

    it('shows answered question for answered = true', async () => {
        getQuestionById.mockImplementationOnce(async () => answeredQuestion);
        const result = await sut.getQuestionById(1);
        expect(result).toEqual(answeredQuestion);
    });
});
