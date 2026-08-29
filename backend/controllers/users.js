import mongoose from 'mongoose';
import User from '../models/users.js';
import BadRequestError from '../errors/BadRequestError.js';
import NotFoundError from '../errors/NotFoundError.js';

export async function getUsers(req, res, next) {
  try {
    const users = await User.find({});

    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
}

export async function getCurrentUser(req, res, next) {
  const currentUser = req.user._id;
  try {
    const users = await User.findById(currentUser);

    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
}

export async function getUserByID(req, res, next) {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new BadRequestError('Invalid user ID'));
  }

  try {
    const user = await User.findById(userId)
      .orFail(() => { throw new NotFoundError('User not found'); });
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
}

export async function updateUser(req, res, next) {
  const { name, about } = req.body;
  const id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new BadRequestError('Invalid user ID'));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true, runValidators: true },
    )
      .orFail(() => { throw new NotFoundError('User not found'); });
    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
}

export async function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;
  const id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new BadRequestError('Invalid user ID'));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true, runValidators: true },
    )
      .orFail(() => { throw new NotFoundError('User not found'); });
    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
}

export async function deleteUser(req, res, next) {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new BadRequestError('Invalid user ID'));
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId)
      .orFail(() => { throw new NotFoundError('User not found'); });
    return res.status(200).json(deletedUser);
  } catch (err) {
    return next(err);
  }
}