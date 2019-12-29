const userService = require('../services/userService')
const errorHandler = require('../libs/errorHandler')
const { canAccess } = require('../helpers/access')

const errorMessage = function (obj = {}) {
    errorHandler({...obj, controller: 'User'})
    console.log(obj.err)
}

// initiate the controller
let controller = {}

controller.login = async (req, res, next) => {
    try {
        const data = await userService.login(req.body)
        req.app.locals.role.setRole(data.roleType)
        res.send(data)
    } catch (err) {
        errorMessage({req, res, err})
    }
}
controller.getUsers = async (req, res, next) => {
    try {
        const items = await userService.getUsers(req.query)
        res.send({ access : req.app.locals.Acl.getAccess('user'), items })
    } catch (err) {
        errorMessage({req, res, err})
    }
}
controller.create = async (req, res, next) => {
    try {
        const data = await userService.create(req.body)
        res.send(data)
    } catch (err) {
        errorMessage({req, res, err})
    }
}

module.exports = controller