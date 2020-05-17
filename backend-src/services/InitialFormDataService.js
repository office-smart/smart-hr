'use strict'

/* deps */
const { result } = require('lodash')
const moment = require('moment')
const EmployeeService = require('./EmployeeService')
// const CompanyInformationService = require('./CompanyInformationService')

const service = {}

service.getInitMyInfo = async (userdata = {}) => {
  const {
    emergencyContacts,
    employeeInfo,
    familyInfo,
    generalInfo,
    contract,
    details
  } = await EmployeeService.getDetailInfo({ employeeID: userdata.employeeId })
  const explodedContractDate = moment(result(contract, 'hireDate', '')).format('YYYY-MM-DD').split('-')
  const birthdate = moment(result(generalInfo, 'dateOfBirth', '')).format('YYYY-MM-DD').split('-')
  const data = {
    employementInfo: {
      companyName: result(details, 'CompanyInformation.companyName', '-'),
      oraganizationName: result(details, 'divisionInformation.title', '-'), // blm ada di db
      jobPosition: result(details, 'JobInformation.title', '-'),
      jobTitle: result(details, 'JobInformation.title', '-'),
      employementStatus: result(employeeInfo, 'type', '-'),
      branchId: result(details, 'BranchInformation.title', '-'),
      joinDate: {
        d: result(explodedContractDate, '[2]', '-'),
        m: result(explodedContractDate, '[1]', '-'),
        y: result(explodedContractDate, '[0]', '-')
      }
    },
    personal: {
      employeeId: userdata.employeeId,
      firstname: result(generalInfo, 'name.first', '-'),
      lastname: result(generalInfo, 'name.middle', '-') + ' ' + result(generalInfo, 'name.middle', '-'),
      email: result(generalInfo, 'email', '-'),
      barcode: result(generalInfo, 'barcode', '-'),
      identityType: result(generalInfo, 'identities[0].type', '-'),
      identityNumber: result(generalInfo, 'identities[0].serial', '-'),
      address: result(generalInfo, 'address', '-'),
      city: result(generalInfo, '', '-'),
      postalCode: result(generalInfo, '', '-'),
      placeOfBirth: result(generalInfo, '', '-'),
      dateOfBirth: {
        d: result(birthdate, '[2]', '-'),
        m: result(birthdate, '[1]', '-'),
        y: result(birthdate, '[0]', '-')
      },
      phoneNumber1: result(generalInfo, 'phoneNumber1', '-'),
      phoneNumber2: result(generalInfo, 'phoneNumber2', '-'),
      gender: result(generalInfo, 'gender', '-'),
      maritalStatus: result(generalInfo, 'maritalStatus', '-'),
      bloodType: result(generalInfo, 'bloodType', '-'),
      religion: result(generalInfo, '', '-')
    },
    familyInfo,
    emergencyContacts
  }
  return data
}

module.exports = service
