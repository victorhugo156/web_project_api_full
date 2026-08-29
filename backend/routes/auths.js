import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { signup, login } from '../controllers/auths.js';

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

export default authsRouter;