'use strict'

const mongoose = require('mongoose')
const { Services: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)

const model = mongoose.model('AccountServices', schema, 'AccountServices')

module.exports = model
