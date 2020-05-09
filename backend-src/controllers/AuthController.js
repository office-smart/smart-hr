'use strict'

const AuthenticationService = require('../services/AuthenticationService')

class AuthController {
  async login ({ req, res, config }, next) {
    try {
      const data = await AuthenticationService.doLogin(req.body)
      res.api200(data)
    } catch (err) {
      res.api400(err)
    }
  }

  async logout ({ req, res, config }, next) {
    try {
      const data = await AuthenticationService.doLogout(config.token)
      res.api200(data)
    } catch (err) {
      res.api400(err)
    }
  }
}

module.exports = AuthController