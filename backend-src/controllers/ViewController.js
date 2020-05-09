'use strict'

const AccessService = require('../services/AccessControllService')

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

class ViewController {
  async login ({ req, res }, next) {
    res.render('statics/login', { title: 'Login', isDev })
  }

  async logout ({ req, res }, next) {
    res.redirect('/login')
  }

  async register ({ req, res }, next) {
    res.render('statics/register', { title: 'Register', isDev })
  }

  async forgot ({ req, res }, next) {
    res.render('statics/forgot', { title: 'Forgot Password', isDev })
  }

  async dashboard ({ req, res }, next) {
    res.render('statics/dashboard', { menus: loadMenu(req.lang, 'dashboard'), title: 'Dashboard', isDev })
  }

  async myinfo ({ req, res }, next) {
    try {
      const permissions = await AccessService.getAccessPermission('myinfo', req.config.permissions)
      res.render('statics/my-info', { menus: loadMenu(req.lang, 'myinfo'), title: 'My Info', isDev, permissions })
    } catch (err) {
      res.api400(err)
    }
  }

  async employees ({ req, res }, next) {
    res.render('statics/employees', { menus: loadMenu(req.lang, 'employees'), title: 'Employees', isDev })
  }

  async timeoff ({ req, res }, next) {
    res.render('statics/timeoff', { menus: loadMenu(req.lang, 'timeoff'), title: 'Time Off', isDev })
  }

  async overtime ({ req, res }, next) {
    res.render('statics/overtime', { menus: loadMenu(req.lang, 'timeoff'), title: 'Time Off', isDev })
  }

  async payroll ({ req, res }, next) {
    res.render('statics/payroll', { menus: loadMenu(req.lang, 'payroll'), title: 'Payroll', isDev })
  }

  async calendar ({ req, res }, next) {
    res.render('statics/calendar', { menus: loadMenu(req.lang, 'calendar'), title: 'Calendar', isDev })
  }

  async tasks ({ req, res }, next) {
    res.render('statics/tasks', { menus: loadMenu(req.lang, 'tasks'), title: 'Tasks', isDev })
  }

  async myinbox ({ req, res }, next) {
    res.render('statics/my-inbox', { menus: loadMenu(req.lang, 'myinbox'), title: 'My Inbox', isDev })
  }

  async approval ({ req, res }, next) {
    res.render('statics/approval', { menus: loadMenu(req.lang, 'approval'), title: 'Approval', isDev })
  }

  async users ({ req, res }, next) {
    res.render('statics/users', { menus: loadMenu(req.lang, 'users'), activeMenu: 'users', title: 'User Page' })
  }

  async roles ({ req, res }, next) {
    res.render('statics/roles', { menus: loadMenu(req.lang, 'roles'), activeMenu: 'roles', title: 'Role Page' })
  }

  async administration ({ req, res }, next) {
    const modules = [
      'administration/mycompany.js',
      'administration/myemployees.js',
      'administration/calendars.js',
      'administration/payrolls.js',
      'administration/broadcast.js',
      'administration/audit.js'
    ]
    res.render('statics/administration', { config: req.config, menus: loadMenu(req.lang, 'administration'), title: 'Administration', isDev, modules })
  }
}

module.exports = ViewController
