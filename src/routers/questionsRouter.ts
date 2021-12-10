import { Router } from "express";
import * as questionsController from '../controllers/questionsController';

const router = Router();

router.post('', questionsController.postQuestion);
router.get('/:id', questionsController.getQuestionById);

export default router;