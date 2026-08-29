import jwt from 'jsonwebtoken';
import UnauthorisedError from '../errors/Unauthorised.js';

export default function AuthMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    throw new UnauthorisedError();
  }

  const tokenJwt = token.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(tokenJwt, process.env.JWT_SECRET);
  } catch (error) {
    throw new UnauthorisedError();
  }

  req.user = {
    _id: payload._id,
  };

  next();
}