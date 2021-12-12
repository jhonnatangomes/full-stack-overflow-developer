import * as rankingServices from '../../src/services/rankingServices';
import * as questionsRepositories from '../../src/repositories/questionsRepositories';
import { Question } from '../../src/interfaces/QuestionsInterface';
import { Ranking } from '../../src/interfaces/RankingInterface';

const sut = rankingServices;

describe('get ranking', () => {
    const questions: Question[] = [
        {
            answeredBy: 'Jhonn',
            question: 'what is that?',
            student: 'Outro Jhonn',
            class: 'T3',
            answered: true,
        },
        {
            answeredBy: 'Jhonn',
            question: 'what is that?',
            student: 'Outro Jhonn',
            class: 'T3',
            answered: true,
        },
        {
            answeredBy: 'Jhonn',
            question: 'what is that?',
            student: 'Outro Jhonn',
            class: 'T3',
            answered: true,
        },
        {
            answeredBy: 'Jhonn2',
            question: 'what is that?',
            student: 'Outro Jhonn',
            class: 'T3',
            answered: true,
        },
        {
            answeredBy: 'Jhonn3',
            question: 'what is that?',
            student: 'Outro Jhonn',
            class: 'T3',
            answered: true,
        },
        {
            answeredBy: 'Jhonn3',
            question: 'what is that?',
            student: 'Outro Jhonn',
            class: 'T3',
            answered: true,
        },
    ];

    const ranking: Ranking[] = [
        {
            name: 'Jhonn',
            answers: 3,
        },
        {
            name: 'Jhonn3',
            answers: 2,
        },
        {
            name: 'Jhonn2',
            answers: 1,
        },
    ];

    jest.spyOn(questionsRepositories, 'getAllQuestions').mockImplementation(
        async () => questions
    );

    it('returns ordered ranking', async () => {
        const result = await sut.getRanking('normal');
        expect(result).toEqual(ranking);
    });
});
