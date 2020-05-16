'use strict'

/* deps */
import md5 from 'md5'

/* helpers */
import lang from '../languages/index'
import { set, del } from '../libs/redis'

/* services */
import AccountsService from './AccountsService'
import EncryptionService from './EncryptionService'
import AccessControllService from './AccessControllService'

/* constants */
import { TOKEN_EXP } from '../config/app'
const ErrorLoginInvalid = lang('EN', 'E_INVALID_USERNAME')
const exp = TOKEN_EXP || 12 * 60 * 60

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
  const stringData = JSON.stringify({
    userid: data._id,
    username,
    lang,
    employeeId: data.employeeID,
    companyId: data.companyID,
    exp: newExp
  })
  const key = md5(stringData)
  set({ key, value: stringData, exp }) // 12 jam
  set({ key: `permissions_${key}`, value: data.permissions.toString(), exp }) // 12 jam
  return { token: key, username, exp: newExp, timeServer: new Date().getTime() }
}

service.getLoginInfo = async ({ username, password }) => {
  const account = await AccountsService.findBy({ username })
  const { _id: accountId, lang, employeeID, email, status, password: encryptedPassword, companyID } = account.toJSON()
  if (!accountId) throw new Error(ErrorLoginInvalid)
  const isValidPassword = await EncryptionService.compare(password, encryptedPassword)
  if (!isValidPassword) throw new Error(ErrorLoginInvalid)
  if (status === 'banned') throw new Error('Account Was Banned By System')
  if (status === 'tmp-banned') throw new Error('Account Was Temporary Banned By System')
  if (status === 'need-verify') throw new Error('Unverified Account. Please Check Your Email Verification')
  const { permissions } = await AccessControllService.getAccess(accountId)
  const data = { accountId, lang, employeeID, email, username: '@' + username, status, companyID }
  if (permissions && permissions[0]) data.permissions = permissions || [] // required type is array
  return data
}

service.doLogout = function (currentToken = '') {
  if (!currentToken) throw new Error('You\'re never logged in')
  del(currentToken)
}

export default service
