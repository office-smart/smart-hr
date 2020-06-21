'use strict'

const { result, intersection } = require('lodash')
const Redis = require('./Components/Providers/redis')

/* components */
const AuthMiddleware = require('./Components/Middlewares/AuthMiddleware')
const ThrottleMiddleware = require('./Components/Middlewares/ThrottleMiddleware')

module.exports = {
  AuthMiddleware: AuthMiddleware({ Redis, lodash: { result, intersection } }),
  ThrottleMiddleware: ThrottleMiddleware({ Redis })
}
