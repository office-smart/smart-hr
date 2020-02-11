'use strict'

const express = require('express')
const router = express.Router()

// controllers
const AccountsController = require('../controllers/AccountsController')

// middlewares
const AuthMiddleware = require('../middlewares/AuthMiddleware')

const { version, name } = require('../../package.json')

router.get('/', (req, res) => {
    res.send({
        app_name: name,
        version
    })
})

// login route
router.post('/user/login', [ AccountsController.login ])

// users routes
router.get('/users', [ AuthMiddleware,  AccountsController.getUsers ])
router.post('/users/create', [ AuthMiddleware,  AccountsController.create ])

module.exports = router
