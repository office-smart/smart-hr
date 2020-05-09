'use strict'

const backendRoutes = require('./backendRoutes')
const frontendRoutes = require('./frontendRoutes')
const documentation = require('./documentation')
const { version, name } = require('../../package.json')

module.exports = (app) => {
  // global middlewares fires before all controllers are executed
  app.use((req, res, next) => {
    console.log(`[${req.method}]`, req.originalUrl)
    next()
  })
  // backend routes v1
  app.use('/api/v1', backendRoutes)
  // frontend routes
  app.use('/version', function (req, res) {
    res.send({
      name,
      version
    })
  })
  app.use('/documentation', documentation)
  app.use('/', frontendRoutes)
  // any method and path
  app.all('*', (req, res) => {
    res
      .status(404)
      .send({
        errorCode: 404,
        message: 'Path Not Found',
        app_name: name,
        version
      })
  })
  // global middlewares fires after controller executed
  app.use((err, req, res, next) => {
    res.status((err && err.data && err.data.code) || 500)
    console.log(err)
    res.send(err.message)
  })
  return app
}
