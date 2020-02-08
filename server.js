'use strict'

require('dotenv').config()
const mongodbConnection = require('./app/libs/mongodb')
const {createRedisConnection} = require('./app/libs/redis')
const express = require('express')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3003

// register.js
require('./register')(app, express)
// route.js
require('./route')(app)

createRedisConnection()
    .then(() => {
        mongodbConnection()
            .then(() => {
                app.listen(port, host, console.log(`app listen on ${port}`))
            })
            .catch((err) => {
                console.log(err)
                process.exit(0)
            })
    })
    .catch((err) => {
        console.log(err)
        process.exit(0)
    })
