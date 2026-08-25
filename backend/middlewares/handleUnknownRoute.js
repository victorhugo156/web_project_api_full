import NotFoundError from '../errors/NotFoundError.js';

export default function handleUnknownRoute(_req, _res, next) {
  return next(new NotFoundError('Route not found'));
}