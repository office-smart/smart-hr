'use strict'

const express = require('express')
const router = express.Router()

// controllers
const viewController = require('../controllers/ViewController')

// middlewares
const CookieAuth = require('../middlewares/CookieAuthMiddleware')
const { CanAccess } = require('../middlewares/AccessMiddleware')

router.get('/', (req, res) => {
  res.redirect('/users')
})
router.get('/login', [viewController.login])
router.get('/logout', [viewController.logout])
router.get('/users', [CookieAuth, CanAccess('user:visit'), viewController.users])

module.exports = router
