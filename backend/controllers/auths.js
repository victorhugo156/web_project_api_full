import { genSalt, hash } from 'bcryptjs';
import User from '../models/users.js';

// login will be added as a second named export
// eslint-disable-next-line import/prefer-default-export
export async function signup(req, res, next) {
  try {
    const {
      email, password, name, about, avatar,
    } = req.body;
    const salt = await genSalt(10);
    const passwordHashed = await hash(password, salt);

    const newUser = await User.create({
      email,
      password: passwordHashed,
      name: name || 'Jacques Cousteau',
      about: about || 'Explorador',
      avatar: avatar || 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',

    });
    return res.status(201).json(newUser);
  } catch (err) {
    return next(err);
  }
}