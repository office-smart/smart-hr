'use strict'

const express = require('express')
const router = express.Router()

// controllers
const viewController = require('../controllers/ViewController')

// middlewares
const CookieAuth = require('../middlewares/CookieAuthMiddleware')
const { ViewAccess } = require('../middlewares/AccessMiddleware')

router.get('/', (req, res) => {
    res.redirect('/transactions')
})
router.get('/login', [viewController.login])
router.get('/logout', [viewController.logout])
// router.get('/register', [CookieAuth, ViewAccess, viewController.register])
// router.get('/forgot', [CookieAuth, ViewAccess, viewController.forgot])
router.get('/products', [CookieAuth, ViewAccess, viewController.products])
router.get('/transactions', [CookieAuth, ViewAccess, viewController.transactions])
router.get('/users', [CookieAuth, ViewAccess, viewController.users])

module.exports = router
