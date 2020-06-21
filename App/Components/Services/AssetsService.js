'use strict'

const fs = require('fs')
const md5 = require('md5')
const path = require('path')
const { redisSetData } = require('../providers/redis')

// paths
const clientIdentityPath = path.join(__dirname, '../../public/modules/dynamics/clientidentification.js')
// static scripts
const clientIdentityScript = fs.readFileSync(clientIdentityPath, { encoding: 'utf-8' })
const service = {}

service.getClientIdentityScript = async function (accountId) {
  const identityClient = md5(new Date().getTime())
  const script = clientIdentityScript
    .replace(/\n/g, ' ')
    .replace('IDENTITY_KEY', identityClient)
    .replace(/\s+/g, ' ')
    .replace(/\/\/ break;/g, '\n')
  await redisSetData({
    key: `identity_${identityClient}`,
    value: 200,
    exp: 1 * 60 * 1000 // 1 menit >> jika dalam 1 menit tidak dipakai, berarti identity udh terdefinisi dalam cookie. dan jika dipakai, maka ttl akan ditambah menjadi 1 hari
  })
  return script
}

module.exports = service
