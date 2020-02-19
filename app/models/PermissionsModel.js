'use strict'

const mongoose = require('mongoose')
const { Permissions: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)

const model = mongoose.model('PermissionsModel', schema, 'PermissionsModel')

module.exports = model
