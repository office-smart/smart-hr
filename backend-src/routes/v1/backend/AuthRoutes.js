'use strict'

const {
  AuthMiddleware,
  ThrottleMiddleware
} = require('../../../middlewares')

module.exports = {
  'auth.login': {
    method: 'POST',
    path: '/auth/login',
    controller: 'AuthController.login',
    afterController: [],
    beforeController: [
      ThrottleMiddleware.limitRequest(60, 4)
    ]
  },
  'auth.logout': {
    method: 'GET',
    path: '/auth/logout',
    controller: 'AuthController.logout',
    afterController: [],
    beforeController: [
      AuthMiddleware.token,
      ThrottleMiddleware.limitRequest(60, 4)
    ]
  }
}
