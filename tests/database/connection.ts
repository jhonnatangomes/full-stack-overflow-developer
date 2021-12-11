import connection from "../../src/database";

function endConnection() {
    connection.end();
}

async function cleanDatabase() {
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM questions')
}

export { endConnection, cleanDatabase };