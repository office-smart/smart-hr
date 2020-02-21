'use strict'

// models
const AccountsModel = require('../models/AccountsModel')
// interfaces
// const { Accounts: AccountInterface } = require('../interfaces/ModelInterfaces')

const service = {}

service.getUsers = async ({ username, email, status, page, limit }, myusername) => {
  const criteria = {}
  criteria.username = {
    $ne: myusername
  }
  if (username) criteria.username.$eq = new RegExp(username)
  if (email) criteria.email = email
  if (status) criteria.status = parseInt(status)
  limit = (limit && parseInt(limit) > 0) ? parseInt(limit) : 10
  page = (page && parseInt(page)) ? parseInt(page) : 1
  const skip = (page - 1) * limit
  const data = await AccountsModel.find(criteria).skip(skip).limit(limit)
  const row = []
  for (const r of data) {
    const { email: e, username: u, roleType, status: s, userId, createdAt, updateAt } = r
    row.push({ email: e, username: u, roleType, status: s, userId, createdAt, updateAt })
  }
  return row
}
service.getNewUserID = async () => {
  const pattern = 'U-000'
  const { userId } = await AccountsModel.findOne({}).sort({ $natural: -1 })
  const lastId = `${parseInt(userId.replace('U-', '')) + 1}`
  const lenChar = lastId.length
  const newId = pattern.substring(0, pattern.length - lenChar) + lastId
  return newId
}
service.checkExists = async (username) => {
  const exists = await AccountsModel.findOne({ username })
  if (exists) throw new Error(`${username} already exists!`)
}
service.create = async ({ username, password, confirm, email, roleType }) => {
  if (password !== confirm) throw new Error('Password Doesnt Match')
  roleType = roleType === 'admin' ? 'admin' : 'user'
  await service.checkExists(username)
  const data = await AccountsModel.updateOne({ username }, {
    $setOnInsert: {
      _id: null,
      userId: await service.getNewUserID(),
      username,
      password: await EncryptionService.generate(password),
      email,
      status: 1,
      roleType,
      createAt: new Date()
    },
    $set: {
      updateAt: new Date()
    }
  }, { upsert: true })
  return data
}

module.exports = service
