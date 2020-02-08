'use strict'

const CompanyInformationModel = require('../models/CompanyInformationModel')

let service = {}

service.validateInformation = (data) => {
    try {
        
    } catch (err) {
        throw err
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
