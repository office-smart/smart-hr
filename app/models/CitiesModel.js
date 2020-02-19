'use strict'

const mongoose = require('mongoose')
const { Cities: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)

const model = mongoose.model('CitiesModel', schema, 'CitiesModel')

module.exports = model
