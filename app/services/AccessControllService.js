'use strict'

// models
const AccessControllModel = require('../models/AccessControllModel')

const service = {}

service.getAccess = async function (accountId) {
  const access = await AccessControllModel.findOne({ accountId }, { permissions: true })
  return access.toJSON()
}

service.getAccessPermission = async (data = {}, permissionList = []) => {
  const accessable = {}
  for (const permissionKey in data) {
    const permission = data[permissionKey]
    accessable[permissionKey] = permissionList.indexOf(permission) > -1
  }
  return accessable
}

module.exports = service
