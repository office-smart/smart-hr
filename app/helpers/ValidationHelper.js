const { validationResult } = require('express-validator')
const { ValidationError } = require('../libs/ErrorHandler')

class ValidationHelper {
  ValidationResultWrapper () {
    return (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(new ValidationError({ errors: errors.array(), message: 'Validation Error' }))
      }
      next()
    }
  }
}

module.exports = ValidationHelper
