'use strict'

class Routers {
  constructor (app, { pkg }, { api, frontend, documentation }) {
    this.app = app
    this.appVersion = pkg.version
    this.appName = pkg.name
    this.components = { api, frontend, documentation }
  }

  register () {
    // backend routes v1
    this.app.use('/api/v1', this.components.api)
    // frontend routes
    this.app.use('/version', function (req, res) {
      res.send({
        name: this.appName,
        version: this.appVersion
      })
    })
    this.app.use('/documentation', this.components.documentation)
    this.app.use('/', this.components.frontend)
    // middleware
    this.app.use((err, req, res, next) => {
      res.status((err && err.data && err.data.code) || 500)
      console.log(err)
      res.send(err.message)
    })
    // any method and path
    this.app.all('*', (req, res) => {
      res
        .status(404)
        .send({
          errorCode: 404,
          message: 'Path Not Found',
          app_name: this.appName,
          version: this.appVersion
        })
    })
    return this.app
  }
}

module.exports = (app, config, components) => {
  return new Routers(app, config, components)
}
