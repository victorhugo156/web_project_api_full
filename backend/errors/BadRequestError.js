import AppError from './AppError.js';
import { BAD_REQUEST } from './statusCodes.js';

export default class BadRequestError extends AppError {
  constructor(message) {
    super(message, BAD_REQUEST);
  }
}
