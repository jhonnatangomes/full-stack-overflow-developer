import { Question } from '../interfaces/QuestionsInterface';
import * as questionsRepositories from '../repositories/questionsRepositories';

async function postQuestion(question: Question) {
    const result = await questionsRepositories.postQuestion(question);
    return result.id;
}

export { postQuestion };