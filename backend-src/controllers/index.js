const AccountsController = require('./AccountsController')
const ViewController = require('./ViewController')
const CompanyController = require('./CompanyController')
const AuthController = require('./AuthController')
const AssetsController = require('./AssetsController')
// const RoleController = require('./RoleController')

module.exports = {
  // A
  AuthController: new AuthController(),
  AssetsController: new AssetsController(),
  AccountsController: new AccountsController(),
  // C
  CompanyController: new CompanyController(),
  // V
  ViewController: new ViewController()
  // RoleController: new RoleController()
}
