'use strict'

const mongoose = require('mongoose')
const { CompanyInformation: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)

const model = mongoose.model('CompanyInformations', schema, 'CompanyInformations')

module.exports = model
