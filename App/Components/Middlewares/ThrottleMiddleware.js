'use strict'

function getIdentity (request) {
  const identity = request.header('smart-identity')
  return identity
}
class ThrottleMiddleware {
  constructor ({ Redis }) {
    this.redis = Redis
  }

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
        const dataOnRedis = await this.redisGetData(key)
        if (!dataOnRedis) throw new Error('Need Login Again!!')
        await this.redisSetData(key, dataOnRedis - 1)
        await next()
      } catch (err) {
        response.api400(err)
      }
    }
  }
}

module.exports = function (injections) {
  return new ThrottleMiddleware(injections)
}
