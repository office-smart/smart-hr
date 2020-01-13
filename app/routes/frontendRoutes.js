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
// router.get('/register', [CookieAuth, ViewAccess, viewController.register])
router.get('/forgot', [/* CookieAuth, ViewAccess,  */viewController.forgot])
router.get('/dashboard', [/* CookieAuth, ViewAccess,  */viewController.dashboard])
router.get('/my-info', [/* CookieAuth, ViewAccess,  */viewController.myinfo])
router.get('/employees', [/* CookieAuth, ViewAccess,  */viewController.employees])
router.get('/timeoff', [/* CookieAuth, ViewAccess,  */viewController.timeoff])
router.get('/payroll', [/* CookieAuth, ViewAccess,  */viewController.payroll])
router.get('/calendar', [/* CookieAuth, ViewAccess,  */viewController.calendar])
router.get('/tasks', [/* CookieAuth, ViewAccess,  */viewController.tasks])
router.get('/my-inbox', [/* CookieAuth, ViewAccess,  */viewController.myinbox])
router.get('/approval', [/* CookieAuth, ViewAccess,  */viewController.approval])
router.get('/users', [CookieAuth, CanAccess('user:visit'), viewController.users])
router.get('/roles', [CookieAuth, CanAccess('role:visit'), viewController.roles])

module.exports = router
