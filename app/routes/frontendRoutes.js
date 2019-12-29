'use strict'

const express = require('express')
const router = express.Router()

// controllers
const viewController = require('../controllers/ViewController')

// middlewares
const CookieAuth = require('../middlewares/CookieAuthMiddleware')
const { CanAccess } = require('../middlewares/AccessMiddleware')

router.get('/', (req, res) => {
    res.redirect('/transactions')
})
router.get('/login', [viewController.login])
router.get('/logout', [viewController.logout])
// router.get('/register', [CookieAuth, ViewAccess, viewController.register])
// router.get('/forgot', [CookieAuth, ViewAccess, viewController.forgot])
// router.get('/products', [CookieAuth, HasCan('products:visit'), viewController.products])
// router.get('/transactions', [CookieAuth,HasCan('products:visit'), ViewAccess, viewController.transactions])
router.get('/users', [CookieAuth, CanAccess('user:visit'), viewController.users])

module.exports = router
