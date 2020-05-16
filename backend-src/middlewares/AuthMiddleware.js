'use strict'

import { result, intersection } from 'lodash'
import { get } from '../libs/redis'

class AuthMiddleware {
  getToken (request) {
    const token = result(request, 'cookies.smart-token', request.header('smart-token')) || request.query['smart-token']
    if (!token || (token && token.length === 0)) throw new Error('Invalid Auth Header')
    return token
  }

  token (request, response, next) {
    try {
      const token = this.getToken(request)
      request.config = { token }
      next()
    } catch (err) {
      response.api400(err)
    }
  }

  getAccess (access = []) {
    this.access = access
    return async (request, response, next) => {
      try {
        const token = this.getToken(request)
        const needPermissions = this.access.length
        const access = await get(`permissions_${token}`)
        if (!access) return response.redirect('/login')
        const arrayAccess = access.split(',').filter(x => typeof x === 'string').map(x => x.trim())
        if (intersection(arrayAccess, this.access).length < needPermissions) throw new Error('Need Permission To Access This Page')
        const user = await get(token)
        if (!user || (user && user.length === 0)) throw new Error('Invalid Session Data')
        const { employeeId, username, lang, companyId, exp } = JSON.parse(user)
        const config = {
          lang,
          token: token,
          username,
          employeeId,
          companyId,
          exp,
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

export default AuthMiddleware
