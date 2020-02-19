'use strict'

const mongoose = require('mongoose')
const { AccessControll: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)

const model = mongoose.model('AccessControllModel', schema, 'AccessControllModel')

module.exports = model
