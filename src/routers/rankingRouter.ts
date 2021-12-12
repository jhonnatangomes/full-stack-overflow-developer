import { Router } from 'express';
import * as rankingController from '../controllers/rankingController';

const router = Router();

router.get('', rankingController.getRanking);
router.get('/weighted', rankingController.getWeightedRanking);

export default router;
