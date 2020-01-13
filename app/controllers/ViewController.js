'use strict'

const isDev = process.env.NODE_ENV === 'development'
const { menus: loadMenu } = require('../services/lang/index')

const controller = {}

controller.login = (req, res) => {
  res.render('login', { title: 'Login', isDev })
}
controller.logout = (req, res) => {
  res.redirect('/login')
}
controller.register = (req, res) => {
  res.render('register', { title: 'Register', isDev })
}
controller.forgot = (req, res) => {
  res.render('forgot', { title: 'Forgot Password', isDev })
}
controller.dashboard = async (req, res) => {
  res.render('dashboard', { menus: loadMenu(req.lang, 'dashboard'), title: 'Dashboard', isDev })
}
controller.myinfo = (req, res) => {
  res.render('my-info', { menus: loadMenu(req.lang, 'myinfo'), title: 'My Info', isDev })
}
controller.employees = (req, res) => {
  res.render('employees', { menus: loadMenu(req.lang, 'employees'), title: 'Employees', isDev })
}
controller.timeoff = (req, res) => {
  res.render('timeoff', { menus: loadMenu(req.lang, 'timeoff'), title: 'Time Off', isDev })
}
controller.payroll = (req, res) => {
  res.render('payroll', { menus: loadMenu(req.lang, 'payroll'), title: 'Payroll', isDev })
}
controller.calendar = (req, res) => {
  res.render('calendar', { menus: loadMenu(req.lang, 'calendar'), title: 'Calendar', isDev })
}
controller.tasks = (req, res) => {
  res.render('tasks', { menus: loadMenu(req.lang, 'tasks'), title: 'Tasks', isDev })
}
controller.myinbox = (req, res) => {
  res.render('my-inbox', { menus: loadMenu(req.lang, 'myinbox'), title: 'My Inbox', isDev })
}
controller.approval = (req, res) => {
  res.render('approval', { menus: loadMenu(req.lang, 'approval'), title: 'Approval', isDev })
  res.render('register', { activeMenu: '' })
}
controller.forgot = (req, res) => {
  res.render('forgot', { activeMenu: '' })
}
controller.users = (req, res) => {
  res.render('users', { menus: loadMenu(req.lang, 'users'), activeMenu: 'users', title: 'User Page' })
}
controller.roles = (req, res) => {
  res.render('roles', { menus: loadMenu(req.lang, 'roles'), activeMenu: 'roles', title: 'Role Page' })
}

module.exports = controller
