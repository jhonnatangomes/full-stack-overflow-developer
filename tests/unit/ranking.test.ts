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
            score: 1,
        },
        {
            answeredBy: 'Jhonn',
            question: 'what is that?',
            student: 'Outro Jhonn',
            class: 'T3',
            answered: true,
            score: 1,
        },
        {
            answeredBy: 'Jhonn',
            question: 'what is that?',
            student: 'Outro Jhonn',
            class: 'T3',
            answered: true,
            score: 1,
        },
        {
            answeredBy: 'Jhonn2',
            question: 'what is that?',
            student: 'Outro Jhonn',
            class: 'T3',
            answered: true,
            score: 10,
        },
        {
            answeredBy: 'Jhonn3',
            question: 'what is that?',
            student: 'Outro Jhonn',
            class: 'T3',
            answered: true,
            score: 3,
        },
        {
            answeredBy: 'Jhonn3',
            question: 'what is that?',
            student: 'Outro Jhonn',
            class: 'T3',
            answered: true,
            score: 4,
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

    const rankingByPoints: Ranking[] = [
        {
            name: 'Jhonn2',
            answers: 1,
            points: 10,
        },
        {
            name: 'Jhonn3',
            answers: 2,
            points: 7,
        },
        {
            name: 'Jhonn',
            answers: 3,
            points: 3,
        },
    ];

    jest.spyOn(questionsRepositories, 'getAllQuestions').mockImplementation(
        async () => questions
    );

    it('returns ordered ranking by answers when rank type is normal', async () => {
        const result = await sut.getRanking('normal');
        expect(result).toEqual(ranking);
    });

    it('returns ordered ranking by points when rank type is weighted', async () => {
        const result = await sut.getRanking('weighted');
        expect(result).toEqual(rankingByPoints);
    });
});
