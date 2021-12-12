import faker from 'faker';
import connection from '../../src/database';
import { User } from '../../src/interfaces/UserInterface';

function incorrectUser() {
    return {
        name: faker.datatype.number(),
        class: faker.datatype.string(),
    };
}

function correctUser() {
    return {
        name: faker.name.findName(),
        class: faker.datatype.string(),
    };
}

async function createUser(): Promise<User> {
    const user = {
        name: faker.name.findName(),
        class: faker.datatype.string(),
        token: faker.datatype.uuid(),
    };

    const result = await connection.query(
        `
        INSERT INTO users (name, class, token)
        VALUES ($1, $2, $3) RETURNING *
    `,
        [user.name, user.class, user.token]
    );

    return result.rows[0];
}

function stringFactory() {
    return faker.datatype.string();
}

function tokenFactory() {
    return faker.datatype.uuid();
}

function alphaNumericFactory() {
    return faker.random.alphaNumeric(15);
}

export {
    incorrectUser,
    correctUser,
    createUser,
    stringFactory,
    tokenFactory,
    alphaNumericFactory,
};
