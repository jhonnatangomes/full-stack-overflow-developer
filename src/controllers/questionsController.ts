import { Request, Response, NextFunction } from 'express';
import validateQuestion from '../validations/validateQuestion';
import * as questionsServices from '../services/questionsServices';
import { ValidationResponse } from '../interfaces/ValidationsInterface';

async function postQuestion(req: Request, res: Response, next: NextFunction) {
    try {
        const questionValidation: ValidationResponse = validateQuestion(req.body);
        if (!questionValidation.isValid) {
            return res.status(400).send(questionValidation.error);
        }

        const questionId: number = await questionsServices.postQuestion(req.body);
        return res.send({
            id: questionId
        });
    } catch (error) {
        return next(error);
    }
}

async function getQuestionById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: questionId } = req.params;
        const result = await questionsServices.getQuestionById(Number(questionId));
        return res.send(result);
    } catch (error) {
        if (error.type === 'NotFound') {
            return res.status(404).send(error.message);
        }
        return next(error);
    }
}

export { postQuestion, getQuestionById };