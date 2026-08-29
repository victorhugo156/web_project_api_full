import { Router } from 'express';
import {
  getUsers, getUserByID, updateUser, deleteUser, updateUserAvatar, getCurrentUser,
} from '../controllers/users.js';

const usersRouter = Router();

usersRouter.get('/', getUsers);

usersRouter.get('/me', getCurrentUser);

usersRouter.get('/:userId', getUserByID);

usersRouter.patch('/me', updateUser);

usersRouter.patch('/me/avatar', updateUserAvatar);

usersRouter.delete('/:userId', deleteUser);

export default usersRouter;