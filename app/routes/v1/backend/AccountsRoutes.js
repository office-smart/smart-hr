'use strict'

const { AuthMiddleware } = require('../../../middlewares')

module.exports = {
  'account.root': {
    method: 'GET',
    path: '/accounts',
    controller: 'AccountsController.getAccounts',
    afterController: [], // the middlewares fires after execute the controller function
    beforeController: [] // the middlewares fires before execute the controller function
  },
  'account.create': {
    method: 'POST',
    path: '/account/create',
    controller: 'AccountsController.create',
    afterController: [],
    beforeController: [
      AuthMiddleware.getAccess('hr.administration.employees.create') // typeof VAR is a function
    ]
  }
}
