'use strict'

// services
const AccountsService = require('../services/AccountsService')
const AuthenticationService = require('../services/AuthenticationService')

class UserController {
  async login (req, res, next) {
    try {
      const data = await AuthenticationService.doLogin(req.body)
      res.api400()
    } catch (err) {
      res.api400(err)
    }
  }

  async getUsers (req, res, next) {
    try {
      // const access = getAccess(req.roleAccess, 'users')
      const items = await AccountsService.getUsers(req.query)
      res.api200({ access: [], items })
    } catch (err) {
      res.api400()
    }
  }

  async create (req, res, next) {
    try {
      const data = await AccountsService.create(req.body)
      res.send(data)
    } catch (err) {
      new InternalError({ message: 'something error happen', stack: err.toString() })
    }
  }
}

module.exports = UserController
