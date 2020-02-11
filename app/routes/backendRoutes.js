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


const ctrl = new AccountsController()

// login route
router.post('/user/login', [ ctrl.login ])

// users routes
router.get('/users', [ AuthMiddleware,  ctrl.getUsers ])
router.post('/users/create', [ AuthMiddleware,  ctrl.create ])

module.exports = router
