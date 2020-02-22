'use strict'

const { result, intersection } = require('lodash')
const { get } = require('../libs/redis')

class AuthMiddleware {
  getAccess (access = []) {
    this.access = access
    return async (request, response, next) => {
      try {
        const token = result(request, 'cookies.smart-token', request.header('smart-token')) || request.query['smart-token']
        if (!token || (token && token.length === 0)) throw new Error('Invalid Auth Header')
        const needPermissions = this.access.length
        const access = await get(`permissions_${token}`)
        if (!access) return response.redirect('/login')
        const arrayAccess = access.split(',').filter(x => typeof x === 'string').map(x => x.trim())
        if (intersection(arrayAccess, this.access).length < needPermissions) throw new Error('Need Permission To Access This Page')
        const user = await get(token)
        if (!user || (user && user.length === 0)) throw new Error('Invalid Session Data')
        const JSONuser = JSON.parse(user)
        const config = {
          lang: '',
          token: token,
          user: JSONuser,
          permissions: arrayAccess
        }
        request.config = config
        await next()
      } catch (err) {
        const url = request.originalUrl
        const isFrontRequest = url.indexOf('/api/') > -1
        if (isFrontRequest) {
          response.api400(err)
        } else {
          response.redirect('/login')
        }
      }
    }
  }
}

module.exports = AuthMiddleware
