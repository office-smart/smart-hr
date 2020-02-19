'use strict'

const mongoose = require('mongoose')
const { Clients: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)

const model = mongoose.model('ClientsModel', schema, 'ClientsModel')

module.exports = model
