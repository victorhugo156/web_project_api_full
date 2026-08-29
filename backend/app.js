import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import usersRouter from './routes/users.js';
import cardsRouter from './routes/cards.js';
import AuthMiddleware from './middlewares/authMiddleware.js';
import handleUnknownRoute from './middlewares/handleUnknownRoute.js';
import errorHandler from './middlewares/errorHandler.js';
import authsRouter from './routes/auths.js';
import 'dotenv/config';
import { errorLogger, requestLogger } from './middlewares/reqLoggerMiddleware.js';


async function main() {
  await mongoose.connect('mongodb://localhost:27017/aroundb');
}

main().then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));

const app = express();
const port = 3000;

app.use(express.json());

app.use(requestLogger)

app.use('/auth', authsRouter);

app.use(AuthMiddleware);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errors());

app.use(errorLogger);

app.use(handleUnknownRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log('server running...');
});