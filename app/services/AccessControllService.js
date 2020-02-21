'use strict'

// models
const AccessControllModel = require('../models/AccessControllModel')

const service = {}

service.getAccess = async function (accountId) {
  const access = await AccessControllModel.findOne({ accountId }, { permissions: true })
  return access
}

module.exports = service
