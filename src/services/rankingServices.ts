import { Ranking } from '../interfaces/RankingInterface';
import * as questionsRepositories from '../repositories/questionsRepositories';

async function getRanking(): Promise<Ranking[]> {
    const questions = await questionsRepositories.getAllQuestions();

    let ranking: Ranking[] = [];

    questions.forEach((question) => {
        if (question.answered) {
            const nameAlreadyInRanking: boolean = ranking.some(
                (el) => el.name === question.answeredBy
            );
            if (!nameAlreadyInRanking) {
                ranking.push({
                    name: question.answeredBy,
                    answers: 1,
                });
            } else {
                ranking = ranking.map((el) => {
                    if (el.name === question.answeredBy) {
                        return {
                            ...el,
                            answers: el.answers + 1,
                        };
                    }
                    return el;
                });
            }
        }
    });

    ranking.sort((a, b) => b.answers - a.answers);

    return ranking;
}

export { getRanking };
