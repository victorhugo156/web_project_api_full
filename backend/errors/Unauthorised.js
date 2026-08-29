import AppError from './AppError.js';
import { UNAUTHORISED } from './statusCodes.js';

export default class UnauthorisedError extends AppError {
  constructor(message = 'Unauthorised') {
    super(message, UNAUTHORISED);
  }
}