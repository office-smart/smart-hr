'use strict'

const mongoose = require('mongoose')
const { AccessControll: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)
schema.statics = require('./statics/ExtendsStatics')

const model = mongoose.model('AccessControll', schema, 'AccessControll')

module.exports = model
