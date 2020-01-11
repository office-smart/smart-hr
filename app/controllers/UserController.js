const userService = {}
const { InternalError } = require('../libs/ErrorHandler')

class UserController {
  async login (req, res, next) {
    try {
      const data = await userService.login(req.body)
      req.app.locals.role.setRole(data.roleType)
      res.send(data)
    } catch (err) {
      new InternalError({ message: 'something error happen', stack: err.toString() })
    }
  }

  async getUsers (req, res, next) {
    try {
      const items = await userService.getUsers(req.query)
      res.send({ access: req.app.locals.Acl.getAccess('user'), items })
    } catch (err) {
      new InternalError({ message: 'something error happen', stack: err.toString() })
    }
  }

  async create (req, res, next) {
    try {
      const data = await userService.create(req.body)
      res.send(data)
    } catch (err) {
      new InternalError({ message: 'something error happen', stack: err.toString() })
    }
  }
}

module.exports = UserController
