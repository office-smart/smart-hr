'use strict'

// models
const EmployeeModel = require('../models/EmployeesModel')

let service = {}

service.getEmployeeInfo = async function ({ employeeId }) {
    try {
        const employee = await EmployeeModel.aggregate([
            {
                $match: {_id: employeeId}
            },
            
        ])
    } catch (err) {
        throw err
    }
}

module.exports = service
