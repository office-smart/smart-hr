'use strict'

const isDev = process.env.NODE_ENV === 'development'
const { menus: loadMenu } = require('../services/lang/index')

let controller = {}

controller.login = (req, res) => {
    res.render('login', { title: 'Login', isDev })
}
controller.logout = (req, res) => {
    res.redirect('/login')
}
controller.register = (req, res) => {
    res.render('register', { title: 'Register', isDev })
}
controller.forgot= (req, res) => {
    res.render('forgot', { title: 'Forgot Password', isDev })
}
controller.dashboard = async (req, res) => {
    console.log(req.config)
    res.render('dashboard', { config: req.config, menus: loadMenu(req.lang, 'dashboard'), title: 'Dashboard' , isDev })
}
controller.myinfo = (req, res) => {
    res.render('my-info', {config: req.config, menus: loadMenu(req.lang, 'myinfo'), title: "My Info", isDev })
}
controller.employees = (req, res) => {
    res.render('employees', {config: req.config, menus: loadMenu(req.lang, 'employees'), title: "Employees", isDev })
}
controller.timeoff = (req, res) => {
    res.render('timeoff', {config: req.config, menus: loadMenu(req.lang, 'timeoff'), title: "Time Off", isDev })
}
controller.payroll = (req, res) => {
    res.render('payroll', {config: req.config, menus: loadMenu(req.lang, 'payroll'), title: "Payroll", isDev })
}
controller.calendar = (req, res) => {
    res.render('calendar', {config: req.config, menus: loadMenu(req.lang, 'calendar'), title: "Calendar", isDev })
}
controller.tasks = (req, res) => {
    res.render('tasks', {config: req.config, menus: loadMenu(req.lang, 'tasks'), title: "Tasks", isDev })
}
controller.myinbox = (req, res) => {
    res.render('my-inbox', {config: req.config, menus: loadMenu(req.lang, 'myinbox'), title: "My Inbox", isDev })
}
controller.approval = (req, res) => {
    res.render('approval', {config: req.config, menus: loadMenu(req.lang, 'approval'), title: "Approval", isDev })
}
controller.administration = (req, res) => {
    res.render('administration', {config: req.config, menus: loadMenu(req.lang, 'administration'), title: "Administration", isDev })
}

module.exports = controller
