'use strict'

require('dotenv').config()
const mongodbConnection = require('./backend-src/providers/mongodb')
const { createRedisConnection } = require('./backend-src/providers/redis')
const express = require('express')
const app = express()
// register.js
require('./backend-src/config/register')(app)
// route.js
require('./backend-src/routes')(app)
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3003

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
