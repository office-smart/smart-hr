'use strict'

const mongoose = require('mongoose')
const { Employees: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)
schema.statics = require('./statics/ExtendsStatics')

const model = mongoose.model('Employees', schema, 'Employees')

module.exports = model
