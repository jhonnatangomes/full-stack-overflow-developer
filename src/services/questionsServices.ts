import dayjs from 'dayjs';
import APIError from '../errors/APIError';
import { Question } from '../interfaces/QuestionsInterface';
import * as questionsRepositories from '../repositories/questionsRepositories';
import * as usersRepositories from '../repositories/usersRepositories';

async function postQuestion(question: Question): Promise<number> {
    const result = await questionsRepositories.postQuestion(question);
    return result.id;
}

async function getQuestionById(questionId: number): Promise<Question> {
    const result = await questionsRepositories.getQuestionById(questionId);

    if (result === null) {
        throw new APIError('question doesnt exist', 'NotFound');
    }

    result.submittedAt = dayjs(result.submittedAt).format('YYYY-MM-DD HH:mm');
    result.answeredAt = dayjs(result.answeredAt).format('YYYY-MM-DD HH:mm');

    if (!result.answered) {
        delete result.answeredAt;
        delete result.answeredBy;
        delete result.answer;
    }

    delete result.score;
    delete result.id;
    return result;
}

async function answerQuestion(
    questionId: number,
    answer: string,
    token: string
): Promise<string> {
    const user = await usersRepositories.getUserByColumn(token, 'token');

    if (user === null) {
        throw new APIError('user doesnt exist', 'NotFound');
    }

    const question = await questionsRepositories.getQuestionById(questionId);

    if (question === null) {
        throw new APIError('question doesnt exist', 'NotFound');
    }

    if (question.answered) {
        throw new APIError('question already answered', 'Conflict');
    }

    const answeredBy = user.name;

    const answeredQuestion = await questionsRepositories.answerQuestion(
        answer,
        answeredBy,
        questionId
    );
    return answeredQuestion.answer;
}

async function getAllUnansweredQuestions(): Promise<Question[]> {
    const questions = await questionsRepositories.getAllUnansweredQuestions();
    return questions;
}

export {
    postQuestion,
    getQuestionById,
    answerQuestion,
    getAllUnansweredQuestions,
};
