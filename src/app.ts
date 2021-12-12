import '../dotenv/setup';
import express from 'express';
import cors from 'cors';

import questionsRouter from './routers/questionsRouter';
import rankingRouter from './routers/rankingRouter';
import { postUser } from './controllers/usersController';
import errorMiddleware from './middlewares/error';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/questions', questionsRouter);
app.post('/users', postUser);
app.use('/ranking', rankingRouter);

app.use(errorMiddleware);
export default app;
