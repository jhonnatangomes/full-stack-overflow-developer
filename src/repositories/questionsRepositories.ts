import connection from '../database';
import { Question } from '../interfaces/QuestionsInterface';

async function postQuestion(question: Question): Promise<Question> {
    const {
        question: questionName,
        student,
        class: questionClass,
        tags,
    } = question;

    const result = await connection.query(
        `
        INSERT INTO questions (question, student, class, tags) VALUES ($1, $2, $3, $4)
        RETURNING *
    `,
        [questionName, student, questionClass, tags]
    );

    return result.rows[0];
}

async function getQuestionById(questionId: number): Promise<Question> {
    const result = await connection.query(
        `
        SELECT * FROM questions WHERE id = $1
    `,
        [questionId]
    );

    if (result.rowCount === 0) {
        return null;
    }

    return result.rows[0];
}

async function answerQuestion(
    answer: string,
    answeredBy: string,
    questionId: number
): Promise<Question> {
    const result = await connection.query(
        `
        UPDATE questions SET answer = $1, "answeredBy" = $2, "answeredAt" = now(), answered = true
        WHERE id = $3 
        RETURNING *;
    `,
        [answer, answeredBy, questionId]
    );

    return result.rows[0];
}

async function getAllUnansweredQuestions(): Promise<Question[]> {
    const result = await connection.query(`
        SELECT id, question, student, class, "submittedAt"
        FROM questions
        WHERE answered = false
    `);

    return result.rows;
}

async function getAllQuestions(): Promise<Question[]> {
    const result = await connection.query(`
        SELECT * FROM questions;
    `);

    return result.rows;
}

async function voteQuestion(
    questionId: number,
    voteType: string
): Promise<Question> {
    let baseQuery = 'UPDATE questions';
    if (voteType === 'upvote') {
        baseQuery += ' SET score = score + 1';
    }
    if (voteType === 'downvote') {
        baseQuery += ' SET score = score - 1';
    }

    baseQuery += ' WHERE id = $1 RETURNING *';

    const result = await connection.query(baseQuery, [questionId]);

    if (result.rowCount === 0) {
        return null;
    }

    return result.rows[0];
}

export {
    postQuestion,
    getQuestionById,
    answerQuestion,
    getAllUnansweredQuestions,
    getAllQuestions,
    voteQuestion,
};
