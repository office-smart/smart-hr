'use strict'

/* global deps */
const requireall = require('require-all')

/* local deps */
const Config = require('./Config')

/* Controller Components */
const AccountsController = require('./Components/Controllers/AccountsController')
const ViewController = require('./Components/Controllers/ViewController')
const CompanyController = require('./Components/Controllers/CompanyController')
const AuthController = require('./Components/Controllers/AuthController')
const AssetsController = require('./Components/Controllers/AssetsController')
// const RoleController = require('./RoleController')

// menu
const menus = Config.get('menu')

// Services
const LangService = require('./Components/Services/LangService')
const MenuService = require('./Components/Services/MenuService')

// helpers
const languages = requireall('./Languages')

module.exports = {
  // A
  AuthController: AuthController(),
  AssetsController: AssetsController(),
  AccountsController: AccountsController(),
  // C
  CompanyController: CompanyController(),
  // V
  ViewController: ViewController({ list: menus, LangService, MenuService, languages })
  // RoleController: new RoleController()
}
