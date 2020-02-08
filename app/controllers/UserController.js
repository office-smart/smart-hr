'use strict'

const md5 = require('md5')
const UserModel = require('../models/Users')
const { set } = require('../libs/redis')
const { InternalError } = require('./../libs/ErrorHandler')
const conf = require('./../config/app')
class UserController {
  async login (req, res, next) {
    try {
      const exp = conf.TOKEN_EXP
      const { username } = req.body
      const data = await UserModel.findOne({
        username
      })
      const { roleType } = data
      const newExp = new Date().getTime() + exp
      const stringData = JSON.stringify({ username, roleType, exp: newExp })
      const key = md5(stringData)
      set({ key, value: stringData, exp }) // 12 jam
      req.app.locals.Acl.setRole(roleType)
      res.send({ token: key, username, roleType, exp: newExp })
    } catch (err) {
      next(new InternalError({ message: 'something error happen', stack: err.toString() }))
    }
  }

  async getUsers (req, res, next) {
    try {
      let { username, email, status, page, limit } = req.query
      const criteria = {}
      const myusername = req.config.user.username
      criteria.username = {
        $ne: myusername
      }
      if (username) criteria.username.$eq = new RegExp(username)
      if (email) criteria.email = email
      if (status) criteria.status = parseInt(status)
      limit = (limit && parseInt(limit) > 0) ? parseInt(limit) : 10
      page = (page && parseInt(page)) ? parseInt(page) : 1
      const skip = (page - 1) * limit
      const data = await UserModel.find(criteria).skip(skip).limit(limit)
      const row = []
      for (const r of data) {
        const { email: e, username: u, roleType, status: s, userId, createdAt, updateAt } = r
        row.push({ email: e, username: u, roleType, status: s, userId, createdAt, updateAt })
      }
      res.send({
        code: 200,
        status: 'OK',
        message: 'sucess',
        data: {
          access: req.app.locals.Acl.getAccessByResource('user'),
          items: row
        }
      })
    } catch (err) {
      new InternalError({ message: 'something error happen', stack: err.toString() })
    }
  }

  async create (req, res, next) {
    try {
      const data = await userService.create(req.body)
      res.send(data)
    } catch (err) {
      new InternalError({ message: 'something error happen', stack: err.toString() })
    }
  }
}

module.exports = UserController
