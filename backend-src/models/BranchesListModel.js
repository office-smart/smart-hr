'use strict'

const mongoose = require('mongoose')
const { Permissions: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)
schema.statics = require('./statics/ExtendsStatics')

const model = mongoose.model('BranchesList', schema, 'BranchesList')

module.exports = model