'use strict'

const AccountRoutes = require('./AccountsRoutes')
const AuthRoutes = require('./AuthRoutes')
const CompanyRoutes = require('./CompanyRoutes')

module.exports = {
  ...AccountRoutes,
  ...AuthRoutes,
  ...CompanyRoutes
}
