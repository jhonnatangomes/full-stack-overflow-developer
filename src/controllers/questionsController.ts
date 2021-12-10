import { Request, Response, NextFunction } from 'express';
import validateQuestion from '../validations/validateQuestion';
import * as questionsServices from '../services/questionsServices';

async function postQuestion(req: Request, res: Response, next: NextFunction) {
    try {
        const questionValidation = validateQuestion(req.body);
        if (!questionValidation.isValid) {
            return res.status(400).send(questionValidation.error);
        }

        const questionId = await questionsServices.postQuestion(req.body);
        return res.send(questionId.toString());
    } catch (error) {
        return next(error);
    }
}

export { postQuestion };