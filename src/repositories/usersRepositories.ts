import connection from '../database';
import User from '../interfaces/UserInterface';

async function getUserByName(name: string): Promise<User> {
    const result = await connection.query(
        `
        SELECT * FROM users WHERE name = $1
    `,
        [name]
    );

    if (result.rowCount === 0) {
        return null;
    }

    return result.rows[0];
}

async function postUser(user: User): Promise<string> {
    const { name, class: userClass, token } = user;

    const result = await connection.query(
        `
        INSERT INTO users (name, class, token)
        VALUES ($1, $2, $3) RETURNING *
    `,
        [name, userClass, token]
    );

    return result.rows[0].token;
}

export { getUserByName, postUser };
