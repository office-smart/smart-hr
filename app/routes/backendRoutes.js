'use strict'

const express = require('express')
const router = express.Router()

// controllers
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')

// middlewares
const TokenAuth = require('../middlewares/TokenAuthMiddleware')
const { CanAccess } = require('../middlewares/AccessMiddleware')

router.get('/', (req, res) => {
    res.send({
        version: '0.1.0'
    })
})

// login route
router.post('/user/login', [UserController.login])

// users routes
router.get('/users', [TokenAuth, CanAccess('user:read'), UserController.getUsers])
router.post('/users/create', [TokenAuth, CanAccess('user:create'), UserController.create])

module.exports = router
