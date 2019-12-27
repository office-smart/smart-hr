'use strict'

const { result } = require('lodash')

const access = {
    admin: require('./acl/admin'),
    user: require('./acl/user')
}

exports.getAccess = (type = 'user', controller) => {
    try {
        const acc = result(access, `[${type}][${controller}]`, null)
        return acc
    } catch (err) {
        console.log(err)
        return []
    }
}