import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import connection from '../../src/database';
import { Question } from '../../src/interfaces/QuestionsInterface';

function incorrectQuestion() {
    return {
        question: faker.datatype.string(),
        student: faker.datatype.number(),
        class: faker.datatype.boolean(),
        tags: faker.datatype.string(),
    };
}

function correctQuestion(): Question {
    return {
        question: faker.datatype.string(),
        student: faker.datatype.string(),
        class: faker.datatype.string(),
        tags: faker.datatype.string(),
    };
}

async function createUnansweredQuestion(): Promise<Question> {
    const question = {
        question: faker.datatype.string(),
        student: faker.datatype.string(),
        class: faker.datatype.string(),
        tags: faker.datatype.string(),
    };

    const result = await connection.query(
        `
        INSERT INTO questions (question, student, class, tags, "submittedAt")
        VALUES ($1, $2, $3, $4, now()) RETURNING *;
    `,
        [question.question, question.student, question.class, question.tags]
    );

    result.rows[0].submittedAt = dayjs(result.rows[0].submittedAt).format(
        'YYYY-MM-DD HH:mm'
    );

    delete result.rows[0].answeredAt;
    delete result.rows[0].answeredBy;
    delete result.rows[0].answer;

    return result.rows[0];
}

async function createAnsweredQuestion(
    answeredBy?: string,
    score?: number
): Promise<Question> {
    const question = {
        question: faker.datatype.string(),
        student: faker.name.findName(),
        class: faker.datatype.string(),
        tags: faker.datatype.string(),
        answered: true,
        submittedAt: faker.date.past(),
        answeredAt: faker.date.future(),
        answeredBy: faker.name.findName(),
        answer: faker.datatype.string(),
    };

    const result = await connection.query(
        `
        INSERT INTO questions
        (question, student, class, tags, answered, "submittedAt", "answeredAt", "answeredBy", answer, score)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;
    `,
        [
            question.question,
            question.student,
            question.class,
            question.tags,
            question.answered,
            question.submittedAt,
            question.answeredAt,
            answeredBy || question.answeredBy,
            question.answer,
            score || 1,
        ]
    );

    result.rows[0].submittedAt = dayjs(result.rows[0].submittedAt).format(
        'YYYY-MM-DD HH:mm'
    );
    result.rows[0].answeredAt = dayjs(result.rows[0].answeredAt).format(
        'YYYY-MM-DD HH:mm'
    );

    return result.rows[0];
}

export {
    incorrectQuestion,
    correctQuestion,
    createUnansweredQuestion,
    createAnsweredQuestion,
};
