'use strict'

const mongoose = require('mongoose')
const { Clients: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)
schema.statics = require('./statics/ExtendsStatics')

const model = mongoose.model('Clients', schema, 'Clients')

module.exports = model
