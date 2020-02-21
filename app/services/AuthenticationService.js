'use strict'

// deps
const md5 = require('md5')
// helpers
const lang = require('../languages/index')
const { set } = require('../libs/redis')
// services
const EmployeeService = require('./EmployeeService')
const EncryptionService = require('./EncryptionService')
const AccessControllService = require('./AccessControllService')
// constants
const exp = 12 * 60 * 60
const ErrorLoginInvalid = lang('EN', 'E_INVALID_USERNAME')

const service = {}

service.doLogin = async ({ username, password }) => {
  const isUsername = (username && username.length > 0)
  const isPassword = (password && password.length > 0)
  const isValid = isUsername && isPassword
  if (!isValid) throw new Error(ErrorLoginInvalid)
  const form = {
    username,
    password
  }
  const newExp = new Date().getTime() + exp
  const data = await service.getLoginInfo(form)
  const lang = (data.lang || 'EN').toUpperCase()
  const stringData = JSON.stringify({ userid: data._id, username, lang, exp: newExp })
  const key = md5(stringData)
  set({ key, value: stringData, exp }) // 12 jam
  return { token: key, username, exp: newExp }
}

service.getLoginInfo = async ({ username, password }) => {
  const { _id: accountId, lang, employeeID, email, status, password: encryptedPassword } = (await AccountsModel.findOne({ username })) || {}
  if (!accountId) throw new Error(ErrorLoginInvalid)
  const isValidPassword = await EncryptionService.compare(password, encryptedPassword)
  if (!isValidPassword) throw new Error(ErrorLoginInvalid)
  const data = { accountId, lang, employeeID, email, username: '@' + username, status }
  if (status === 'banned') throw new Error('Account Was Banned By System')
  if (status === 'tmp-banned') throw new Error('Account Was Temporary Banned By System')
  if (status === 'need-verify') throw new Error('Unverified Account. Please Check Your Email Verification')
  data.access = await AccessControllService.getAccess(accountId)
  if (employeeID) data.employeeInfo = await EmployeeService.getEmployeeInfo({ employeeID })
  return data
}

module.exports = service
