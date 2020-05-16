'use strict'

// models
import AccessControllModel from '../models/AccessControllModel'

const access = {}
access.myinfo = {
  infoPersonal: 'hr.my.info.personal',
  infoEmployee: 'hr.my.info.employee',
  infoFamily: 'hr.my.info.family',
  attendanceList: 'hr.my.attendance.list',
  delegationList: 'hr.my.delegation.list',
  timeoffHistory: 'hr.timeoff.history',
  timeoffRequest: 'hr.timeoff.request',
  overtimeHistory: 'hr.overtime.history',
  overtimeRequest: 'hr.overtime.request',
  payrollHistory: 'hr.payroll.history',
  payrollRequest: 'hr.payroll.request'
}
access.employees = {}
access.timeoff = {}
access.overtime = {}
access.payroll = {}
access.calendar = {}
access.tasks = {}
access.administration = {}

const service = {}

service.getAccess = async function (accountId) {
  const access = await AccessControllModel.findOne({ accountId }, { permissions: true })
  return access.toJSON()
}

service.getAccessPermission = async (acc = '', permissionList = []) => {
  const data = access[acc] || {}
  const accessable = {}
  for (const permissionKey in data) {
    const permission = data[permissionKey]
    accessable[permissionKey] = permissionList.indexOf(permission) > -1
  }
  return accessable
}

export default service
