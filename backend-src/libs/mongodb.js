'use strict'

const mongoose = require('mongoose')

const MONGOURI = process.env.MONGODB_URI

const connect = async () => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('( √ ) mongodb')
    } catch (err) {
        throw err
    }
}

const listenError = () => {
    mongoose.connection.on('error', err => {
        console.error(err)
        console.log('(mongo) trying to connecting again in 3s')
        setTimeout(connect, 3 * 1000)
    })
}

module.exports = function () {
    return new Promise((resolve, reject) => {
        listenError()
        connect().catch(reject).then(resolve)
    })
}