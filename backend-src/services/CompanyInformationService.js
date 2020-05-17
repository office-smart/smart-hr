'use strict'

const CompanyInformationModel = require('../models/CompanyInformationModel')

const service = {}

service.getCompanyInformationById = async (companyId) => {
  const data = await CompanyInformationModel.findOne({ _id: companyId })
  const {
    companyName,
    companyDetail: {
      city,
      address,
      officeEmail,
      officePhone1,
      officePhone2,
      postalCode,
      province
    }
  } = data
  return {
    company_name: companyName,
    city,
    address,
    office_email: officeEmail,
    phone_number_1: officePhone1,
    phone_number_2: officePhone2,
    postal_code: postalCode,
    province
  }
}

service.upsert = async (id, data) => {
  try {
    const q = await CompanyInformationModel
      .updateOne({
        _id: data.companyId
      })
  } catch (err) {
    throw err
  }
}

module.exports = service
