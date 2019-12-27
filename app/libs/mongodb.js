'use strict'

const mongoose = require('mongoose')

const uri = 'mongodb://localhost:27017/stok'

const connect = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('mongodb connected')
    } catch (err) {
        throw err
    }
}

const listenError = () => {
    mongoose.connection.on('error', err => {
        console.error(err)
        setTimeout(connect, 3 * 1000)
    })
}

module.exports = function () {
    return new Promise((resolve, reject) => {
        listenError()
        connect().catch(reject).then(resolve)
    })
}