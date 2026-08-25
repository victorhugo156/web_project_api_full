import { Router } from 'express';
import { signup } from '../controllers/auths.js';

const authsRouter = Router();

authsRouter.post('/signup', signup);

export default authsRouter;