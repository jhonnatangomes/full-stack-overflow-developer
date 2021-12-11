import * as usersServices from '../../src/services/usersServices';
import * as usersRepositories from '../../src/repositories/usersRepositories';
import User from '../../src/interfaces/UserInterface';
import APIError from '../../src/errors/APIError';
import { v4 as uuid } from 'uuid';
import { mocked } from 'jest-mock';

const sut = usersServices;
jest.mock('uuid');

const mockedUuid = mocked(uuid, true);

describe('post user', () => {
    const getUserByName = jest.spyOn(usersRepositories, 'getUserByName');
    const user: User = {
        name: '',
        class: '',
        token: '',
    };

    it('throws error when user already exists', async () => {
        getUserByName.mockImplementationOnce(async () => user);

        const result = sut.postUser(user);
        await expect(result).rejects.toThrow(APIError);
    });

    it('returns token when user doesnt exist', async () => {
        getUserByName.mockImplementationOnce(() => null);
        mockedUuid.mockImplementationOnce(() => 'token');
        jest.spyOn(usersRepositories, 'postUser').mockImplementation(
            async () => 'token'
        );

        const result = await sut.postUser(user);
        expect(result).toEqual('token');
    });
});
