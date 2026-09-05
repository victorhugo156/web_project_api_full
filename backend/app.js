import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.js';
import cardsRouter from './routes/cards.js';
import AuthMiddleware from './middlewares/authMiddleware.js';
import handleUnknownRoute from './middlewares/handleUnknownRoute.js';
import errorHandler from './middlewares/errorHandler.js';
import authsRouter from './routes/auths.js';
import { errorLogger, requestLogger } from './middlewares/reqLoggerMiddleware.js';

async function main() {
  await mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/aroundb');
}

main().then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser());

app.use(requestLogger);

app.use('/', authsRouter);

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