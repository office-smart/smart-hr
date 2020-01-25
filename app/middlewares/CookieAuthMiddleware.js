'use strict'

const { get } = require('../libs/redis')

module.exports = async (req, res, next) => {
    try {
        const xheader = req.cookies.x_hr_key
        const lang = req.cookies.x_hr_lang || 'en'
        if (!xheader || (xheader && xheader.length === 0)) throw new Error('Invalid Auth Header')
        let user = await get(xheader)
        if (!user || (user && user.length === 0)) throw new Error('Invalid Session Data')
        user = JSON.parse(user)
        req.lang = lang
        req.config = { user }
        next()
    } catch (err) {
        console.log(err)
        res.redirect('/login')
    }
}
