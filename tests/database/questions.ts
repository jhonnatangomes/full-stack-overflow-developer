import connection from '../../src/database';
import { Question } from '../../src/interfaces/QuestionsInterface';

async function getQuestionById(questionId: number): Promise<Question> {
    const result = await connection.query(
        `
        SELECT * FROM questions WHERE id = $1
    `,
        [questionId]
    );

    return result.rows[0];
}

export { getQuestionById };
