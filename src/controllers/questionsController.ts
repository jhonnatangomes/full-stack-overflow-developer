import { Request, Response, NextFunction } from 'express';
import validateQuestion from '../validations/validateQuestion';
import * as questionsServices from '../services/questionsServices';
import { ValidationResponse } from '../interfaces/ValidationsInterface';
import validateAnswer from '../validations/validateAnswer';

async function postQuestion(req: Request, res: Response, next: NextFunction) {
    try {
        const questionValidation: ValidationResponse = validateQuestion(
            req.body
        );
        if (!questionValidation.isValid) {
            return res.status(400).send(questionValidation.error);
        }

        const questionId: number = await questionsServices.postQuestion(
            req.body
        );
        return res.send({
            id: questionId,
        });
    } catch (error) {
        return next(error);
    }
}

async function getQuestionById(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id: questionId } = req.params;
        const result = await questionsServices.getQuestionById(
            Number(questionId)
        );
        return res.send(result);
    } catch (error) {
        if (error.type === 'NotFound') {
            return res.status(404).send(error.message);
        }
        return next(error);
    }
}

async function answerQuestion(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: questionId } = req.params;
        const { answer } = req.body;
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.sendStatus(401);
        }

        const answerValidation: ValidationResponse = validateAnswer(answer);
        if (!answerValidation.isValid) {
            return res.status(400).send(answerValidation.error);
        }

        if (!answer || typeof answer !== 'string') {
            return res.status(400).send('answer is required');
        }

        const result = await questionsServices.answerQuestion(
            Number(questionId),
            answer,
            token
        );
        return res.send(result);
    } catch (error) {
        if (error.type === 'NotFound') {
            return res.status(404).send(error.message);
        }
        if (error.type === 'Conflict') {
            return res.status(409).send(error.message);
        }
        return next(error);
    }
}

export { postQuestion, getQuestionById, answerQuestion };
