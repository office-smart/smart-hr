const productService = require('../services/ProductService')
const errorHandler = require('../libs/errorHandler')
const errorMessage = function (obj = {}) {
    errorHandler({...obj, controller: 'Product'})
}

// initiate the controller
let controller = {}

controller.getProduct = async (req, res, next) => {
    try {
        const data = await productService.list({criteria: req.query})
        res.send(data)
    } catch (err) {
        errorMessage({res, res, err})
    }
}
controller.create = async (req, res, next) => {
    try {
        const data = await productService.create({data: req.body})
        res.send(data)
    } catch (err) {
        errorMessage({res, res, err})
    }
}

module.exports = controller