import connection from "../../src/database";
import { QuestionDB } from "../../src/interfaces/QuestionsInterface";

async function getQuestionById(questionId: number): Promise<QuestionDB> {
    const result = await connection.query(`
        SELECT * FROM questions WHERE id = $1
    `, [questionId]);

    return result.rows[0];
}

export { getQuestionById };