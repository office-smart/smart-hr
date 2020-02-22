'use strict'

const mongoose = require('mongoose')
const { Cities: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)
schema.statics = require('./statics/ExtendsStatics')

const model = mongoose.model('Cities', schema, 'Cities')

module.exports = model
