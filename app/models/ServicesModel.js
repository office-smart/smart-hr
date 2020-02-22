'use strict'

const mongoose = require('mongoose')
const { Services: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)
schema.statics = require('./statics/ExtendsStatics')

const model = mongoose.model('Services', schema, 'Services')

module.exports = model
