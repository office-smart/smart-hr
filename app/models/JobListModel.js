'use strict'

const mongoose = require('mongoose')
const { JobList: interfaces } = require('../interfaces/ModelInterfaces')

const schema = new mongoose.Schema(interfaces)

const model = mongoose.model('JobListModel', schema, 'JobListModel')

module.exports = model
