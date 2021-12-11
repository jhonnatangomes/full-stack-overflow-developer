import * as questionsServices from '../../src/services/questionsServices';
import * as questionsRepositories from '../../src/repositories/questionsRepositories';
import { Question, QuestionDB } from '../../src/interfaces/QuestionsInterface';

const sut = questionsServices;

describe('post question', () => {
    
    const mockedQuestion: Question = {
        question: 'as',
        student: 'as',
        class: 'as',
        tags: 'as'
    }

    const mockedResponse: QuestionDB = {
        id: 1,
        ...mockedQuestion,
    }

    it('should post a question', async () => {
        jest.spyOn(questionsRepositories, 'postQuestion').mockImplementation(async () => mockedResponse);

        const result = await sut.postQuestion(mockedQuestion);
        expect(result).toEqual(mockedResponse.id);
    })
})