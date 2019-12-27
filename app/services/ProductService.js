'use strict'

const ProductModel = require('../models/Products')
const Validation = require('../libs/inputValidator')
let service = {}

service.create = async ({ code, name, stock, description }) => {
    try {
        let data = Validation.required({code, name, stock})
        data = Validation.toString({code, name, description})
        data = {...data, ...Validation.toNumber({ stock })}
        data = await ProductModel.updateOne({ code }, {
            $setOnInsert: {
                ...data,
                createdAt: new Date()
            },
            $set: {
                updatedAt: new Date()
            }
        })
        return data
    } catch (err) {
        throw err
    }
}
service.list = async ({ criteria }) => {
    try {
        const data = await ProductModel.find({})
        return data
    } catch (err) {
        throw err
    }
}

module.exports = service
