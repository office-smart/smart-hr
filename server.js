'use strict'

require('dotenv').config()
const mongodbConnection = require('./app/libs/mongodb')
const express = require('express')
const app = express()
const port = process.env.PORT

// register.js
require('./register')(app, express)
// route.js
require('./route')(app)

mongodbConnection()
  .then(() => {
    app.listen(port, console.log(`app listen on ${port}`))
  })
  .catch((err) => {
    console.log(err)
    process.exit(0)
  })
