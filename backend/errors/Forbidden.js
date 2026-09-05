import AppError from './AppError.js';
import { FORBIDDEN } from './statusCodes.js';

export default class Forbidden extends AppError {
  constructor(message = 'Forbidden') {
    super(message, FORBIDDEN);
  }
}