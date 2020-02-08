'use strict'

const express = require('express')
const router = express.Router()

// controllers
const viewController = require('../controllers/ViewController')

// middlewares
const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.get('/', (req, res) => {
    res.redirect('/dashboard')
})
router.get('/login', [viewController.login])
router.get('/logout', [viewController.logout])
// router.get('/register', [AuthMiddleware, viewController.register])
router.get('/forgot', [AuthMiddleware, viewController.forgot])
router.get('/dashboard', [AuthMiddleware, viewController.dashboard])
router.get('/my-info', [AuthMiddleware, viewController.myinfo])
router.get('/employees', [AuthMiddleware, viewController.employees])
router.get('/timeoff', [AuthMiddleware, viewController.timeoff])
router.get('/payroll', [AuthMiddleware, viewController.payroll])
router.get('/calendar', [AuthMiddleware, viewController.calendar])
router.get('/tasks', [AuthMiddleware, viewController.tasks])
router.get('/my-inbox', [AuthMiddleware, viewController.myinbox])
router.get('/approval', [AuthMiddleware, viewController.approval])
router.get('/administration', [AuthMiddleware, viewController.administration])

module.exports = router
