const AccountsService = require('../services/AccountsService')
const errorHandler = require('../libs/errorHandler')
const { getAccess } = require('../helpers/access')

const md5 = require('md5')
const UserModel = require('../models/Users')
const { set } = require('../libs/redis')
const { InternalError } = require('./../libs/ErrorHandler')
const conf = require('./../config/app')
class UserController {
  async login (req, res, next) {
    try {
        const data = await AccountsService.login(req.body)
        res.send(data)
    } catch (err) {
      next(new InternalError({ message: 'something error happen', stack: err.toString() }))
    }
  }

  async getUsers (req, res, next) {
    try {
        const access = getAccess(req.roleAccess, 'users')
        const items = await AccountsService.getUsers(req.query)
        res.send({ access, items })
    } catch (err) {
      new InternalError({ message: 'something error happen', stack: err.toString() })
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
