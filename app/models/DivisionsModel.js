'use strict'

const mongoose = require('mongoose')
const { Divisions: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)

const model = mongoose.model('DivisionsModel', schema, 'DivisionsModel')

module.exports = model
