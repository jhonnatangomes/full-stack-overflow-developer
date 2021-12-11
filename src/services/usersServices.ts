import { v4 as uuid } from 'uuid';
import User from '../interfaces/UserInterface';
import * as usersRepositories from '../repositories/usersRepositories';
import APIError from '../errors/APIError';

async function postUser(user: User): Promise<string> {
    const userResult = await usersRepositories.getUserByName(user.name);

    if (userResult !== null) {
        throw new APIError('username already exists', 'Conflict');
    }

    const token = uuid();
    const userWithToken = {
        ...user,
        token,
    };

    const respondedToken = await usersRepositories.postUser(userWithToken);
    console.log(respondedToken);
    return respondedToken;
}

export { postUser };
