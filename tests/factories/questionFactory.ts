import faker from 'faker';
import connection from '../../src/database';
import {
    AskedQuestion,
    Question,
} from '../../src/interfaces/QuestionsInterface';

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

async function createUnansweredQuestion(): Promise<AskedQuestion> {
    const question = {
        question: faker.datatype.string(),
        student: faker.datatype.string(),
        class: faker.datatype.string(),
        tags: faker.datatype.string(),
    };

    const result = await connection.query(
        `
        INSERT INTO questions (question, student, class, tags)
        VALUES ($1, $2, $3, $4) RETURNING *;
    `,
        [question.question, question.student, question.class, question.tags]
    );

    return result.rows[0];
}

async function createAnsweredQuestion(): Promise<AskedQuestion> {
    const question = {
        question: faker.datatype.string(),
        student: faker.name.findName(),
        class: faker.datatype.string(),
        tags: faker.datatype.string(),
        answered: true,
        answeredBy: faker.name.findName(),
        answer: faker.datatype.string(),
    };

    const result = await connection.query(
        `
        INSERT INTO questions
        (question, student, class, tags, answered, "submittedAt", "answeredAt", "answeredBy", answer)
        VALUES ($1, $2, $3, $4, $5, now(), now(), $6, $7) RETURNING *;
    `,
        [
            question.question,
            question.student,
            question.class,
            question.tags,
            question.answered,
            question.answeredBy,
            question.answer,
        ]
    );

    return result.rows[0];
}

export {
    incorrectQuestion,
    correctQuestion,
    createUnansweredQuestion,
    createAnsweredQuestion,
};
