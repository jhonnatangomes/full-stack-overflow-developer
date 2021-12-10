import connection from "../database";
import { AskedQuestion, Question, QuestionDB } from '../interfaces/QuestionsInterface';

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

async function getQuestionById(questionId: number): Promise<AskedQuestion> {
    const result = await connection.query(`
        SELECT * FROM questions WHERE id = $1
    `, [questionId]);

    if (result.rowCount === 0) {
        return null;
    }

    delete result.rows[0].id;
    return result.rows[0];
}

export { postQuestion, getQuestionById };