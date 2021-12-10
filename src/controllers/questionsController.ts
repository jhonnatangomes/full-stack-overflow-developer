import { Request, Response, NextFunction } from 'express';
import validateQuestion from '../validations/validateQuestion';
import * as questionsServices from '../services/questionsServices';

async function postQuestion(req: Request, res: Response, next: NextFunction) {
    try {
        const { question, student, class: questionClass, tags } = req.body;

        const questionValidation = validateQuestion({ question, student, class: questionClass, tags });
        if (!questionValidation.isValid) {
            return res.status(400).send(questionValidation.error);
        }
        
        const questionId = await questionsServices.postQuestion({ question, student, class: questionClass, tags });
        return res.send(questionId);
    } catch (error) {
        return next(error);
    }
}

export { postQuestion };