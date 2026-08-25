import AppError from './AppError.js';
import { NOT_FOUND } from './statusCodes.js';

export default class NotFoundError extends AppError {
  constructor(message) {
    super(message, NOT_FOUND);
  }
}