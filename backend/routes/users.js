import { Router } from 'express';
import {
  createUser, getUsers, getUserByID, updateUser, deleteUser, updateUserAvatar,
} from '../controllers/users.js';

const usersRouter = Router();

usersRouter.get('/', getUsers);

usersRouter.get('/:userId', getUserByID);

usersRouter.patch('/me', updateUser);

usersRouter.patch('/me/avatar', updateUserAvatar);

usersRouter.post('/', createUser);

usersRouter.delete('/:userId', deleteUser);

export default usersRouter;