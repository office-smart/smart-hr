'use strict'

const AccessService = require('../services/AccessControllService')

const isDev = (process.env.NODE_ENV === 'development')

class ViewController {
  constructor ({ list, LangService, MenuService, languages }) {
    LangService({}).setAllLang(languages) // add variable "this.languages" >> {ID: {...}, EN: {...}}
    this.MenuService = MenuService({ list, LangService })
  }

  async login ({ req, res }, next) {
    res.render('login', { title: 'Login', isDev })
  }

  async logout ({ req, res }, next) {
    res.redirect('/login')
  }

  async register ({ req, res }, next) {
    res.render('register', { title: 'Register', isDev })
  }

  async forgot ({ req, res }, next) {
    res.render('forgot', { title: 'Forgot Password', isDev })
  }

  async dashboard ({ req, res }, next) {
    this.MenuService.setLangType(req.lang) // setup lang to selected language
    const menus = this.MenuService.getMenu('dashboard') // active menu is dashboard
    res.render('dashboard', { menus, title: 'Dashboard', isDev })
  }

  async myinfo ({ req, res }, next) {
    try {
      const permissions = await AccessService.getAccessPermission('myinfo', req.config.permissions)
      this.MenuService.setLangType(req.lang) // setup lang to selected language
      const menus = this.MenuService.getMenu('myinfo') // active menu is myinfo
      res.render('my-info', { menus, title: 'My Info', isDev, permissions })
    } catch (err) {
      res.api400(err)
    }
  }

  async employees ({ req, res }, next) {
    this.MenuService.setLangType(req.lang) // setup lang to selected language
    const menus = this.MenuService.getMenu('employees') // active menu is employees
    res.render('employees', { menus, title: 'Employees', isDev })
  }

  async timeoff ({ req, res }, next) {
    this.MenuService.setLangType(req.lang) // setup lang to selected language
    const menus = this.MenuService.getMenu('timeoff') // active menu is timeoff
    res.render('timeoff', { menus, title: 'Time Off', isDev })
  }

  async overtime ({ req, res }, next) {
    this.MenuService.setLangType(req.lang) // setup lang to selected language
    const menus = this.MenuService.getMenu('timeoff') // active menu is timeoff
    res.render('timeoff', { menus, title: 'Time Off', isDev })
  }

  async payroll ({ req, res }, next) {
    this.MenuService.setLangType(req.lang) // setup lang to selected language
    const menus = this.MenuService.getMenu('payroll') // active menu is payroll
    res.render('payroll', { menus, title: 'Payroll', isDev })
  }

  async calendar ({ req, res }, next) {
    this.MenuService.setLangType(req.lang) // setup lang to selected language
    const menus = this.MenuService.getMenu('calendar') // active menu is calendar
    res.render('calendar', { menus, title: 'Calendar', isDev })
  }

  async tasks ({ req, res }, next) {
    this.MenuService.setLangType(req.lang) // setup lang to selected language
    const menus = this.MenuService.getMenu('tasks') // active menu is tasks
    res.render('tasks', { menus, title: 'Tasks', isDev })
  }

  async myinbox ({ req, res }, next) {
    this.MenuService.setLangType(req.lang) // setup lang to selected language
    const menus = this.MenuService.getMenu('myinbox') // active menu is myinbox
    res.render('my-inbox', { menus, title: 'My Inbox', isDev })
  }

  async approval ({ req, res }, next) {
    this.MenuService.setLangType(req.lang) // setup lang to selected language
    const menus = this.MenuService.getMenu('approval') // active menu is approval
    res.render('approval', { menus, title: 'Approval', isDev })
    res.render('register', { activeMenu: '' })
  }

  async users ({ req, res }, next) {
    this.MenuService.setLangType(req.lang) // setup lang to selected language
    const menus = this.MenuService.getMenu('users') // active menu is users
    res.render('users', { menus, activeMenu: 'users', title: 'User Page' })
  }

  async roles ({ req, res }, next) {
    this.MenuService.setLangType(req.lang) // setup lang to selected language
    const menus = this.MenuService.getMenu('roles') // active menu is roles
    res.render('roles', { menus, activeMenu: 'roles', title: 'Role Page' })
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
    this.MenuService.setLangType(req.lang) // setup lang to selected language
    const menus = this.MenuService.getMenu('administration') // active menu is administration
    res.render('administration', { config: req.config, menus, title: 'Administration', isDev, modules })
  }
}

module.exports = function (config = {}) {
  return new ViewController(config)
}
