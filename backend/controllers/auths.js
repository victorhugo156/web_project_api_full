import { compare, genSalt, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import UnauthorisedError from '../errors/Unauthorised.js';

const ONE_WEEK_SECONDS = 7 * 24 * 60 * 60;
const ONE_WEEK_MS = ONE_WEEK_SECONDS * 1000;

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
      { expiresIn: 5 * 60 }, // 5 minutes
    );

    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: ONE_WEEK_SECONDS },
    );

    const salt = await genSalt(10);
    user.refreshToken = await hash(refreshToken, salt);
    await user.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ONE_WEEK_MS,
    });

    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
}

export async function refreshedToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new UnauthorisedError('Unauthorized');
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(payload._id).select('+refreshToken');

    if (!user || !user.refreshToken) {
      throw new UnauthorisedError('Unauthorized');
    }

    const isRefreshTokenValid = await compare(refreshToken, user.refreshToken);

    if (!isRefreshTokenValid) {
      throw new UnauthorisedError('Unauthorized');
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: 5 * 60 }, // 5 minutes
    );
    const newRefreshToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: ONE_WEEK_SECONDS },
    );

    const salt = await genSalt(10);
    user.refreshToken = await hash(newRefreshToken, salt);
    await user.save();
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ONE_WEEK_MS,
    });

    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
}

export async function logout(req, res, next) {
  const userId = req.user._id;
  try {
    await User.findByIdAndUpdate(userId, { refreshToken: null });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}