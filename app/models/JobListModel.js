'use strict'

const mongoose = require('mongoose')
const { JobList: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)
schema.statics = require('./statics/ExtendsStatics')

const model = mongoose.model('JobList', schema, 'JobList')

module.exports = model
