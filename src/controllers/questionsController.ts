import { Request, Response, NextFunction } from 'express';
import validateQuestion from '../validations/validateQuestion';
import * as questionsServices from '../services/questionsServices';
import { ValidationResponse } from '../interfaces/ValidationsInterface';
import validateToken from '../validations/validateToken';

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
        const { id } = req.params;
        const questionId = Number(id);

        if (Number.isNaN(questionId)) {
            return res.status(400).send('id must be a number');
        }

        const result = await questionsServices.getQuestionById(questionId);
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
        const { id } = req.params;
        const { answer } = req.body;
        const token = req.headers.authorization?.replace('Bearer ', '');

        const questionId = Number(id);

        if (Number.isNaN(questionId)) {
            return res.status(400).send('id must be a number');
        }

        if (!token) {
            return res.sendStatus(401);
        }

        const tokenValidation: ValidationResponse = validateToken(token);
        if (!tokenValidation.isValid) {
            return res.status(401).send(tokenValidation.error);
        }

        if (!answer) {
            return res.status(400).send('answer is required');
        }

        const result = await questionsServices.answerQuestion(
            questionId,
            answer,
            token
        );
        return res.send({
            answer: result,
        });
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

async function getAllUnansweredQuestions(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const questions = await questionsServices.getAllUnansweredQuestions();
        return res.send(questions);
    } catch (error) {
        return next(error);
    }
}

async function voteQuestion(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const questionId = Number(id);

        if (Number.isNaN(questionId)) {
            return res.status(400).send('id must be a number');
        }

        let score: number;
        if (req.url.includes('up-vote')) {
            score = await questionsServices.voteQuestion(questionId, 'upvote');
        }
        if (req.url.includes('down-vote')) {
            score = await questionsServices.voteQuestion(
                questionId,
                'downvote'
            );
        }

        return res.send({
            score,
        });
    } catch (error) {
        if (error.type === 'NotFound') {
            return res.status(404).send(error.message);
        }
        return next(error);
    }
}

export {
    postQuestion,
    getQuestionById,
    answerQuestion,
    getAllUnansweredQuestions,
    voteQuestion,
};
