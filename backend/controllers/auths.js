import { compare, genSalt, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import UnauthorisedError from '../errors/Unauthorised.js';

// login will be added as a second named export
// eslint-disable-next-line import/prefer-default-export
export async function signup(req, res, next) {
  try {
    const {
      email, password,
    } = req.body;
    const salt = await genSalt(10);
    const passwordHashed = await hash(password, salt);

    const newUser = await User.create({
      email,
      password: passwordHashed,
    });
    return res.status(201).json(newUser);
  } catch (err) {
    return next(err);
  }
}

export async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorisedError('Invalid email or password');
    }

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorisedError('Invalid email or password');
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: 7 * 24 * 60 * 60 }, // 1 week in seconds
    );

    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
}
