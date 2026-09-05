import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { signup, login, refreshedToken, logout } from '../controllers/auths.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const authsRouter = Router();

authsRouter.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().min(6).required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  signup,
);

authsRouter.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().min(6).required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  login,
);
authsRouter.post('/refresh', refreshedToken);

authsRouter.post('/logout', authMiddleware, logout);

export default authsRouter;