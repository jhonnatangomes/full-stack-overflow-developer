import connection from "../database";
import { Question, QuestionDB } from '../interfaces/QuestionsInterface';

async function postQuestion(question: Question): Promise<QuestionDB> {
    const {
        question: questionName,
        student,
        class: questionClass,
        tags,
    } = question;

    const result = await connection.query(`
        INSERT INTO questions (question, student, class, tags) VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [questionName, student, questionClass, tags]);

    return result.rows[0];
}

export { postQuestion };