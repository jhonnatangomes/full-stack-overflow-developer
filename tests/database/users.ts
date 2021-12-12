import connection from '../../src/database';
import { User } from '../../src/interfaces/UserInterface';

async function getUserByName(name: string): Promise<User> {
    const result = await connection.query(
        `
        SELECT * FROM users WHERE name = $1
    `,
        [name]
    );

    return result.rows[0];
}

export { getUserByName };
