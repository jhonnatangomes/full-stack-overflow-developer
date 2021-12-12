import { NextFunction, Request, Response } from 'express';
import * as rankingServices from '../services/rankingServices';

async function getRanking(req: Request, res: Response, next: NextFunction) {
    try {
        const ranking = await rankingServices.getRanking('normal');
        return res.send(ranking);
    } catch (error) {
        return next(error);
    }
}

async function getWeightedRanking(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const ranking = await rankingServices.getRanking('weighted');
        return res.send(ranking);
    } catch (error) {
        return next(error);
    }
}

export { getRanking, getWeightedRanking };
