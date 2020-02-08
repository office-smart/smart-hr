/**
 *  Custom Error Nodejs
 *  ref : https://rclayton.silvrback.com/custom-errors-in-node-js
 */
class GeneralError extends Error {
  constructor (message) {
    super(message)
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  convertObjToAttribute (obj) {
    for (const key in obj) {
      this[key] = obj[key]
    }
  }
}

class ResourceNotFoundError extends GeneralError {
  constructor (resource, query) {
    super(`Resource ${resource} was not found.`)
    this.data = { resource, query }
  }
}

class InternalError extends GeneralError {
  constructor ({ message = 'Unknow Error', ...data }) {
    super(message)
    const obj = {
      message, ...data, code: 500, status: 'INTERNAL_ERROR'
    }
    this.convertObjToAttribute(obj)
  }
}

class ValidationError extends GeneralError {
  constructor ({ message, ...data }) {
    super(message)
    const obj = {
      message, ...data, code: 422, status: 'VALIDATION_ERROR'
    }
    this.convertObjToAttribute(obj)
  }
}

module.exports = {
  ResourceNotFoundError,
  InternalError,
  ValidationError
}
