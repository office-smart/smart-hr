'use strict'

const AccessService = require('../services/AccessControllService')
const InitialFormDataService = require('../services/InitialFormDataService')

const lang = require('../languages/index')

const isDev = (process.env.NODE_ENV === 'development')

const loadMenu = (langType = 'EN', active = 'MENU_DASHBOARD') => {
  const menus = [{
    id: 'dashboard',
    class: '',
    icon: 'import_export',
    title: lang(langType, 'MENU_DASHBOARD'),
    link: '/dashboard'
  },
  {
    id: 'myinfo',
    class: '',
    icon: 'person',
    title: lang(langType, 'MENU_MYINFO'),
    link: '/my-info'
  },
  {
    id: 'employees',
    class: '',
    icon: 'group',
    title: lang(langType, 'MENU_EMPLOYEES'),
    link: '/employees'
  },
  {
    id: 'timeoff',
    class: '',
    icon: 'do_not_disturb_off',
    title: lang(langType, 'MENU_TIMEOFF'),
    link: '/timeoff'
  },
  {
    id: 'overtime',
    class: '',
    icon: 'alarm_on',
    title: lang(langType, 'MENU_OVERTIME'),
    link: '/overtime'
  },
  {
    id: 'payroll',
    class: '',
    icon: 'monetization_on',
    title: lang(langType, 'MENU_PAYROLL'),
    link: '/payroll'
  },
  {
    id: 'calendar',
    class: '',
    icon: 'perm_contact_calendar',
    title: lang(langType, 'MENU_CALENDAR'),
    link: '/calendar'
  },
  {
    id: 'tasks',
    class: '',
    icon: 'memory',
    title: lang(langType, 'MENU_TASKS'),
    link: '/tasks'
  },
  {
    id: 'administration',
    class: '',
    icon: 'tune',
    title: lang(langType, 'MENU_ADMINISTRATION'),
    link: '/administration'
  }]
  return menus.map(x => {
    if (active === x.id) x.class = 'active'
    return x
  })
}

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
controller.myinfo = async (req, res) => {
  try {
    const permissions = await AccessService.getAccessPermission('myinfo', req.config.permissions)
    const formData = await InitialFormDataService.getInitMyInfo(req.config.user)
    res.render('my-info', { menus: loadMenu(req.lang, 'myinfo'), title: 'My Info', isDev, permissions, formData })
  } catch (err) {
    res.api400(err)
  }
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
controller.administration = (req, res) => {
  res.render('administration', { config: req.config, menus: loadMenu(req.lang, 'administration'), title: 'Administration', isDev })
}

module.exports = controller
