import { validationResult } from 'express-validator';
import { ValidationError } from '../libs/ErrorHandler';

class ValidationHelper {
  ValidationResultWrapper() {
    return (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ValidationError({ errors: errors.array(), message: 'Validation Error' }));
      }
      next();
    };
  }
}

export default ValidationHelper;