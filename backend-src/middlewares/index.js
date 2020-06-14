'use strict'

const AuthMiddleware = require('./AuthMiddleware')
const ThrottleMiddleware = require('./ThrottleMiddleware')

module.exports = {
  AuthMiddleware: new AuthMiddleware(),
  ThrottleMiddleware: new ThrottleMiddleware()
}
