const backendRoutes = require('./app/routes/backendRoutes')
const frontendRoutes = require('./app/routes/frontendRoutes')

module.exports = (app) => {
  app.use('/api', backendRoutes)
  app.use('/', frontendRoutes)
  app.use((err, req, res, next) => {
    res.status((err && err.data && err.data.code) || 500)
    res.json(err)
  })

  app.all('*', (req, res) => {
    res.status(404).send({
      status: 404,
      version: '0.1.0',
      message: 'Path Not Found'
    })
  })
  return app
}
