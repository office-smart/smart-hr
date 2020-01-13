'use strict'

const express = require('express')
const router = express.Router()

const { UserController, RoleController } = require('../controllers')
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
router.post('/user/login', UserValidation.login(), UserController.login)
router.get('/users', [TokenAuth, CanAccess('user:read'), UserController.getUsers])
router.post('/users/create', [TokenAuth, CanAccess('user:create'), UserController.create])

/**
 *  Role Route
 */
router.get('/roles', [TokenAuth, CanAccess('role:read'), RoleController.getRoles])
router.post('/roles/create', [TokenAuth, CanAccess('role:create'), RoleController.create])

module.exports = router
