import { NextFunction, Request, Response } from 'express';
import { ValidationResponse } from '../interfaces/ValidationsInterface';
import validateUser from '../validations/validateUser';
import * as usersServices from '../services/usersServices';

async function postUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userValidation: ValidationResponse = validateUser(req.body);
        if (!userValidation.isValid) {
            return res.status(400).send(userValidation.error);
        }

        const token: string = await usersServices.postUser(req.body);
        return res.send({
            token,
        });
    } catch (error) {
        return next(error);
    }
}

export { postUser };
