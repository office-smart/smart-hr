'use strict'

const CompanyService = require('../services/CompanyInformationService')

class CompanyController {
  async getCompanyInfo ({ req, res, config }, next) {
    try {
      const data = await CompanyService.getCompanyInformationById(config.companyId)
      res.api200(data)
    } catch (err) {
      res.apiError(err)
    }
  }
}

module.exports = function () {
  return new CompanyController()
}
