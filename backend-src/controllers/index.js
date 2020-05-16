import AccountsController from './AccountsController'
import ViewController from './ViewController'
import CompanyController from './CompanyController'
import AuthController from './AuthController'
// const RoleController = require('./RoleController')

export default {
  // A
  AuthController: new AuthController(),
  AccountsController: new AccountsController(),
  // C
  CompanyController: new CompanyController(),
  // V
  ViewController: new ViewController()
  // RoleController: new RoleController()
}
