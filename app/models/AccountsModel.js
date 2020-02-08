'use strict'

const mongoose = require('mongoose')
const { Accounts: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)

const model = mongoose.model('Accounts', schema, 'Accounts')

module.exports = model
