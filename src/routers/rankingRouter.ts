import { Router } from 'express';
import * as rankingController from '../controllers/rankingController';

const router = Router();

router.get('', rankingController.getRanking);

export default router;
