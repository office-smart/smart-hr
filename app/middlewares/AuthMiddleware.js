'use strict'

const { result } = require('lodash')
const { get } = require('../libs/redis')
const lang = require('../languages')

const Middleware = async (request, response, next) => {
    try {
        const token = result(request, 'cookies.smart-token', request.header('smart-token')) || request.query['smart-token']
        if (!token || (token && token.length === 0)) throw new Error('Invalid Auth Header')
        let user = await get(token)
        if (!user || (user && user.length === 0)) throw new Error('Invalid Session Data')
        user = JSON.parse(user)
        const config = {
            lang: '',
            token: token,
            user
        }
        request['config'] = config
        await next()
    } catch (err) {
        const url = request.originalUrl
        const isFrontRequest = url.indexOf('/api/') > -1
        if (isFrontRequest) {
            response.status(400).send({err: err.message})
        } else {
            response.redirect('/login')
        }
    }
}

module.exports = Middleware
