'use strict'

const AuthMiddleware = require('./AuthMiddleware')

module.exports = {
  AuthMiddleware: new AuthMiddleware()
}
