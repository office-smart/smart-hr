const AccountsService = require('../services/AccountsService')
const errorHandler = require('../libs/errorHandler')
const { getAccess } = require('../helpers/access')

const errorMessage = function (obj = {}) {
    errorHandler({...obj, controller: 'User'})
    console.log(obj.err)
}

// initiate the controller
let controller = {}

controller.login = async (req, res, next) => {
    try {
        const data = await AccountsService.login(req.body)
        res.send(data)
    } catch (err) {
        errorMessage({req, res, err})
    }
}
controller.getUsers = async (req, res, next) => {
    try {
        const access = getAccess(req.roleAccess, 'users')
        const items = await AccountsService.getUsers(req.query)
        res.send({ access, items })
    } catch (err) {
        errorMessage({req, res, err})
    }
}
controller.create = async (req, res, next) => {
    try {
        const data = await AccountsService.create(req.body)
        res.send(data)
    } catch (err) {
        errorMessage({req, res, err})
    }
}

module.exports = controller