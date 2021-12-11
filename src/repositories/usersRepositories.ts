import connection from '../database';
import User from '../interfaces/UserInterface';

async function getUserByColumn(
    searchParam: string,
    columnName: string
): Promise<User> {
    let baseQuery = 'SELECT * FROM users';

    if (columnName === 'name') {
        baseQuery += ' WHERE name = $1';
    }
    if (columnName === 'token') {
        baseQuery += ' WHERE token = $1';
    }

    const result = await connection.query(baseQuery, [searchParam]);

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

export { getUserByColumn, postUser };
