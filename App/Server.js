'use strict'

/* all dependencies */
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')

/* all Components */
const mongodbConnection = require('./Components/Providers/mongodb')
const Redis = require('./Components/Providers/redis')

/* initiate App */
const app = express()

// register.js
const Views = require('./Views')

// Routers and components
const Routers = require('./Routers')
const api = require('./Components/Routes/api')
const frontend = require('./Components/Routes/frontend')
const documentation = require('./Components/Routes/documentation')

class Server {
  constructor (config) {
    this.config = config
  }

  registerRouters () {
    Routers(app, this.config, { api, frontend, documentation })
    return this
  }

  registerViews () {
    Views({ cookieParser, morgan, path }).app(app).registerViews()
  }

  startServer ({ host, port }) {
    Redis.createRedisConnection()
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
  }
}

module.exports = function (config) {
  return new Server(config)
}
