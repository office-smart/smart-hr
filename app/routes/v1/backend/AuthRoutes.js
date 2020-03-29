'use strict'

const { AuthMiddleware } = require('../../../middlewares')

module.exports = {
  'auth.login': {
    method: 'POST',
    path: '/auth/login',
    controller: 'AuthController.login',
    afterController: [],
    beforeController: []
  },
  'auth.logout': {
    method: 'GET',
    path: '/auth/logout',
    controller: 'AuthController.logout',
    afterController: [],
    beforeController: [
      AuthMiddleware.token
    ]
  }
}
