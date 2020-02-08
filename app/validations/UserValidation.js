'use strict'

const { checkSchema } = require('express-validator')
const UserModel = require('../models/Users')
const { ValidationHelper } = require('./../helpers')
const { InternalError } = require('./../libs/ErrorHandler')
const bcrypt = require('bcrypt')

class UserValidations {
  login () {
    let user = {}
    return [checkSchema({
      username: {
        in: ['body'],
        isEmpty: false,
        custom: {
          options: async (value, other) => {
            // check authentication
            try {
              const username = other.req.body.username
              user = await UserModel.findOne({ username })
              if (user && user.password) {
                return value
              }
              return Promise.reject('user not found')
            } catch (error) {
              throw new InternalError({ stack: error.toString() })
            }
          }
        }
      },
      password: {
        in: ['body'],
        isEmpty: false,
        custom: {
          options: async (value, other) => {
            // check authentication
            try {
              const isPasswordValid = await bcrypt.compare(value, user.password)
              if (!isPasswordValid) {
                return Promise.reject('username or password is wrong, please try again')
              }
              return value
            } catch (error) {
              throw new InternalError({ stack: error.toString() })
            }
          }
        }
      }
    }), ValidationHelper.ValidationResultWrapper()]
  }
}

module.exports = UserValidations
