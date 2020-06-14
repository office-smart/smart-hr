'use strict'

const { redisGetData, redisSetData } = require('../providers/redis')

function getIdentity (request) {
  const identity = request.header('smart-identity')
  return identity
}
class ThrottleMiddleware {
  /**
     * Number (time) in second
     * Number (limit)
    */
  limitRequest (time, limit) {
    return async function (request, response, next) {
      try {
        const currentIdentity = getIdentity(request)
        if (!currentIdentity || (currentIdentity && currentIdentity.length === 0)) throw new Error('Need Login Again!')
        const key = `identity_${currentIdentity}`
        const dataOnRedis = await redisGetData(key)
        if (!dataOnRedis) throw new Error('Need Login Again!!')
        await redisSetData(key, dataOnRedis - 1)
        await next()
      } catch (err) {
        response.api400(err)
      }
    }
  }
}

module.exports = ThrottleMiddleware
