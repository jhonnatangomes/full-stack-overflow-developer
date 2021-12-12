import { NextFunction, Request, Response } from 'express';
import * as rankingServices from '../services/rankingServices';

async function getRanking(req: Request, res: Response, next: NextFunction) {
    try {
        const ranking = await rankingServices.getRanking();
        return res.send(ranking);
    } catch (error) {
        return next(error);
    }
}

export { getRanking };
