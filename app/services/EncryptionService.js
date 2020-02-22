'use strict'

// deps
const bcrypt = require('bcrypt')
// constants
const { SALT_ROUND } = require('../config/app')

const service = {}

service.generate = async function (plainText) {
  const hash = await bcrypt.hash(plainText, SALT_ROUND)
  return hash
}

service.compare = async function (plainText, encryptedText) {
  const isValid = await bcrypt.compare(plainText, encryptedText)
  return isValid
}

module.exports = service
