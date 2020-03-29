'use strict'

const { AuthMiddleware } = require('../../../middlewares')

module.exports = {
  'company.my-info': {
    method: 'GET',
    path: '/company/information',
    controller: 'CompanyController.getCompanyInfo',
    afterController: [], // the middlewares fires after execute the controller function
    beforeController: [
      AuthMiddleware.getAccess('hr.administration.company.change') // typeof VAR is a function
    ]
  }
}
