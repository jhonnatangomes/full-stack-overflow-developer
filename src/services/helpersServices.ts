import { Question } from '../interfaces/QuestionsInterface';
import { Ranking } from '../interfaces/RankingInterface';

function createRanking(questions: Question[]): Ranking[] {
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
                    points: question.score,
                });
            } else {
                ranking = ranking.map((el) => {
                    if (el.name === question.answeredBy) {
                        return {
                            ...el,
                            answers: el.answers + 1,
                            points: el.points + question.score,
                        };
                    }
                    return el;
                });
            }
        }
    });

    return ranking;
}

export { createRanking };
