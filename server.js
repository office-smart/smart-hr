'use strict'

require('dotenv').config()
const {join} = require('path')
const mongodbConnection = require('./app/libs/mongodb')
const express = require('express')
const cookieParser = require('cookie-parser')
const backendRoutes = require('./app/routes/backendRoutes')
const frontendRoutes = require('./app/routes/frontendRoutes')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3003

app.disable('view cache')
app.use(cookieParser()) // using cookie parser
app.use(express.static('public', {}))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug')
app.set('views', join(__dirname, 'app/views'))

app.use((req, res, next) => {
    console.log('- accessing ', req.originalUrl)
    next()
})
app.use('/api', backendRoutes)
app.use('/', frontendRoutes)

app.all('*', (req, res) => {
    res
        .status(404)
        .send({
            status: 404,
            version: '0.1.0',
            message: 'Path Not Found'
        })
})

mongodbConnection()
    .then(() => {
        app.listen(port, host, console.log(`app listen on ${port}`))
    })
    .catch((err) => {
        console.log(err)
        process.exit(0)
    })
