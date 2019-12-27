'use strict'

const express = require('express')
const router = express.Router()

// controllers
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')

// middlewares
const TokenAuth = require('../middlewares/TokenAuthMiddleware')
const { ApiAccess } = require('../middlewares/AccessMiddleware')

router.get('/', (req, res) => {
    res.send({
        version: '0.1.0'
    })
})

// login route
router.post('/user/login', [UserController.login])

// product routes
router.get('/products', [TokenAuth, ApiAccess, ProductController.getProduct])
router.get('/products/create', [TokenAuth, ApiAccess, ProductController.create])

// users routes
router.get('/users', [TokenAuth, ApiAccess, UserController.getUsers])
router.post('/users/create', [TokenAuth, ApiAccess, UserController.create])

module.exports = router
