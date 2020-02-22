'use strict'

const express = require('express')
const router = express.Router()

// controllers
const viewController = require('../controllers/ViewController')

// middlewares
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const Auth = new AuthMiddleware()

router.get('/', (req, res) => {
  // res.redirect('/dashboard')
  res.redirect('/users')
})
router.get('/login', [viewController.login])
router.get('/logout', [viewController.logout])
// router.get('/register', [AuthMiddleware, viewController.register])
// console.log(typeof new AuthMiddleware(['hr.menu.forgot']).access())
router.get('/forgot', [Auth.getAccess(['hr.menu.forgot']), viewController.forgot])
router.get('/dashboard', [Auth.getAccess(['hr.menu.dashboard']), viewController.dashboard])
router.get('/my-info', [Auth.getAccess(['hr.menu.my-info']), viewController.myinfo])
router.get('/employees', [Auth.getAccess(['hr.menu.employees']), viewController.employees])
router.get('/timeoff', [Auth.getAccess(['hr.menu.timeoff']), viewController.timeoff])
router.get('/payroll', [Auth.getAccess(['hr.menu.payroll']), viewController.payroll])
router.get('/calendar', [Auth.getAccess(['hr.menu.calendar']), viewController.calendar])
router.get('/tasks', [Auth.getAccess(['hr.menu.tasks']), viewController.tasks])
router.get('/my-inbox', [Auth.getAccess(['hr.menu.my-inbox']), viewController.myinbox])
router.get('/approval', [Auth.getAccess(['hr.menu.approval']), viewController.approval])
router.get('/administration', [Auth.getAccess(['hr.menu.administration']), viewController.administration])

module.exports = router
