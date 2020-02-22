'use strict'

const mongoose = require('mongoose')
const { Divisions: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)
schema.statics = require('./statics/ExtendsStatics')

const model = mongoose.model('Divisions', schema, 'Divisions')

module.exports = model
