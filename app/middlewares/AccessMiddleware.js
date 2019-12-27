'use strict'

const { getAccess } = require('../helpers/access')

exports.ApiAccess = async (req, res, next) => {
    try {
        req.roleAccess = req.config.user.roleType
        next()
    } catch (err) {
        res.render('page-unauthorized')
    }
}

exports.ViewAccess = async (req, res, next) => {
    try {
        const endpoint = req.originalUrl
        const hasAccess = getAccess(req.config.user.roleType, endpoint)
        req.roleAccess = req.config.user.roleType
        if (!hasAccess) throw new Error('Access Denied!')
        next()
    } catch (err) {
        res.render('page-unauthorized')
    }
}