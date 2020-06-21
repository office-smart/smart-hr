'use strict'

require('dotenv').config()

const { version, name } = require('./package.json')

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3003

const Server = require('./App/Server')({ pkg: { version, name } })

Server.registerRouters()
Server.registerViews()
Server.startServer({ host, port })
