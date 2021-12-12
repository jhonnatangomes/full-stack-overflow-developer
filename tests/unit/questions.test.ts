import * as questionsServices from '../../src/services/questionsServices';
import * as questionsRepositories from '../../src/repositories/questionsRepositories';
import * as usersRepositories from '../../src/repositories/usersRepositories';
import { Question } from '../../src/interfaces/QuestionsInterface';
import APIError from '../../src/errors/APIError';
import { User } from '../../src/interfaces/UserInterface';

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

describe('answer question', () => {
    const getUserByColumn = jest.spyOn(usersRepositories, 'getUserByColumn');
    const getQuestionById = jest.spyOn(
        questionsRepositories,
        'getQuestionById'
    );
    const answerQuestion = jest.spyOn(questionsRepositories, 'answerQuestion');
    const user: User = {
        name: '',
        class: '',
        token: '',
    };

    const answeredQuestion: Question = {
        question: '',
        student: '',
        class: '',
        answered: true,
        answer: 'respondido',
    };

    const unansweredQuestion: Question = {
        ...answeredQuestion,
        answered: false,
    };

    it('throws error when user doesnt exist', async () => {
        getUserByColumn.mockImplementationOnce(() => null);
        const result = sut.answerQuestion(1, 'a', 'a');
        await expect(result).rejects.toThrow(APIError);
    });

    it('throws error if question doesnt exist', async () => {
        getUserByColumn.mockImplementation(async () => user);
        getQuestionById.mockImplementationOnce(() => null);

        const result = sut.answerQuestion(1, 'a', 'a');
        await expect(result).rejects.toThrow(APIError);
    });

    it('throws error if question is answered', async () => {
        getQuestionById.mockImplementationOnce(async () => answeredQuestion);
        const result = sut.answerQuestion(1, 'a', 'a');
        await expect(result).rejects.toThrow(APIError);
    });

    it('registers answer and returns it', async () => {
        getQuestionById.mockImplementationOnce(async () => unansweredQuestion);
        answerQuestion.mockImplementation(async () => answeredQuestion);
        const result = await sut.answerQuestion(1, 'a', 'a');
        expect(result).toEqual(answeredQuestion.answer);
    });
});

describe('get all unanswered questions', () => {
    const questions = [
        {
            id: 1,
            question: 'oi',
            student: 'a',
            class: 't2',
            submittedAt: '2021-12-11 19:02',
        },
        {
            id: 2,
            question: 'oi',
            student: 'a',
            class: 't2',
            submittedAt: '2021-12-11 19:02',
        },
        {
            id: 3,
            question: 'oi',
            student: 'a',
            class: 't2',
            submittedAt: '2021-12-11 19:02',
        },
    ];

    jest.spyOn(
        questionsRepositories,
        'getAllUnansweredQuestions'
    ).mockImplementation(async () => questions);

    it('returns an array of questions', async () => {
        const result = await sut.getAllUnansweredQuestions();
        expect(result).toEqual(questions);
    });
});
