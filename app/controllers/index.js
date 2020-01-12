const UserController = require('./UserController')
const RoleController = require('./RoleController')

module.exports = {
  UserController: new UserController(),
  RoleController: new RoleController()
}
