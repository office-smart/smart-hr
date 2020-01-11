'use strict'

const express = require('express')
const router = express.Router()

const { UserController } = require('../controllers')
const TokenAuth = require('../middlewares/TokenAuthMiddleware')
const { CanAccess } = require('../middlewares/AccessMiddleware')
const { UserValidation } = require('../validations')

router.get('/', (req, res) => {
  res.send({
    version: '0.1.0'
  })
})

/**
 *  User Route
 */
router.post('/user/login', UserValidation.login(), (req, res, next) => { res.json({ a: 1 }) })
router.get('/users', [TokenAuth, CanAccess('user:read'), UserController.getUsers])
router.post('/users/create', [TokenAuth, CanAccess('user:create'), UserController.create])

module.exports = router
