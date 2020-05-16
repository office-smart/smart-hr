'use strict'

// models
import EmployeesModel from '../models/EmployeesModel'
import DivisionsModel from '../models/DivisionsModel'
import JobListModel from '../models/JobListModel'
import BranchesListModel from '../models/BranchesListModel'
import CompanyInformationModel from '../models/CompanyInformationModel'

const service = {}

service.getDetailInfo = async function ({ employeeID }) {
  const employee = await EmployeesModel.findOne({ _id: employeeID })
  if (!employee) return employee
  employee.details = await service.getDetails(employee.toJSON())
  return employee
}

service.getDetails = (obj = {}) => {
  const a = CompanyInformationModel.findOne({ _id: obj.companyID })
  const b = DivisionsModel.findOne({ _id: obj.employeeInfo.divisionID })
  const c = JobListModel.findOne({ _id: obj.employeeInfo.jobID })
  const d = BranchesListModel.findOne({ _id: obj.employeeInfo.branchID })
  return Promise.all([a, b, c, d])
    .then(([CompanyInformation, DivisionInformation, JobInformation, BranchInformation]) => ({
      CompanyInformation: CompanyInformation.toJSON(),
      DivisionInformation: DivisionInformation.toJSON(),
      JobInformation: JobInformation.toJSON(),
      BranchInformation: BranchInformation.toJSON()
    }))
}

export default service
