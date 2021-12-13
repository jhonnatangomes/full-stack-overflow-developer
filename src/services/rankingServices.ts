import { Ranking } from '../interfaces/RankingInterface';
import * as questionsRepositories from '../repositories/questionsRepositories';
import { createRanking } from './helpersServices';

async function getRanking(rankingType: string): Promise<Ranking[]> {
    const questions = await questionsRepositories.getAllQuestions();

    let ranking = createRanking(questions);

    if (rankingType === 'normal') {
        ranking = ranking.map((el) => ({
            name: el.name,
            answers: el.answers,
        }));

        ranking.sort((a, b) => b.answers - a.answers);
    }

    if (rankingType === 'weighted') {
        ranking.sort((a, b) => b.points - a.points);
    }

    return ranking;
}

export { getRanking };
