'use strict'

const variables = {
    ID: require('./defaults/ID'),
    EN: require('./defaults/EN')
}

module.exports = (type = 'EN', v, data) => {
    type = type.toUpperCase()
    let msg = variables[type][v]
    if (typeof data === 'object') {
        for (const key in data) {
            msg = msg.replace(new RegExp(x, 'ig'), data[key])
        }
    }
    return msg
}