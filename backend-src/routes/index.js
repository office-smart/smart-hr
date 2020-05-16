'use strict'

import backendRoutes from './backendRoutes'
import frontendRoutes from './frontendRoutes'
import documentation from './documentation'
import { version, name } from '../../package.json'

export default (app) => {
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
  // middleware
  app.use((err, req, res, next) => {
    res.status((err && err.data && err.data.code) || 500)
    console.log(err)
    res.send(err.message)
  })
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
  return app
}
