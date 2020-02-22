'use strict'

const mongoose = require('mongoose')

const interfaces = {}

interfaces
  .Clients = {
    _id: mongoose.Types.ObjectId,
    name: String,
    services: [
      // smart-hr
      // smart-ga
      // smart-accounting
      // smart-warehouse
      // smart-safety
      // smart-wt
      // smart-qa
      // smart-engineering
      // smart-purchasing
      // smart-ppc
      // source >> https://samiinstansi.blogspot.com/2019/05/tugas-dan-tanggung-jawab-divisi-ataudepartementdiperusahaan.html
    ],
    createAt: Date,
    updateAt: Date
  }

interfaces
  .CompanyInformation = {
    _id: mongoose.Types.ObjectId,
    clientID: mongoose.Types.ObjectId,
    companyCode: String,
    companyName: String,
    companyDetail: {
      address: String,
      city: String,
      province: String,
      postalCode: String,
      officePhone1: String,
      officePhone2: String,
      officeEmail: String
    },
    createAt: Date,
    updateAt: Date
  }

interfaces
  .Accounts = {
    _id: mongoose.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    lang: String,
    companyID: mongoose.Types.ObjectId,
    employeeID: mongoose.Types.ObjectId,
    status: String, // active, banned, tmp-banned, need-verify
    createAt: Date,
    updateAt: Date
  }

interfaces
  .Services = {
    _id: mongoose.Types.ObjectId,
    serviceName: String, // lihat field service pada interface "Clients"
    serviceDescription: String, // lihat juga source untuk description
    createAt: Date,
    updateAt: Date
  }

interfaces
  .Employees = {
    _id: mongoose.Types.ObjectId,
    generalInfo: {
      name: {
        first: String,
        middle: String,
        last: String
      },
      address: String,
      cityID: mongoose.Types.ObjectId,
      postalCode: Number,
      placeOfBirth: mongoose.Types.ObjectId,
      dateOfBirth: Date,
      gender: String,
      maritalStatus: String,
      phoneNumber1: String,
      phoneNumber2: String,
      bloodType: String,
      religion: String,
      identities: [
        /*
                {
                    type: 'KTP',
                    serial: '40093738377387736'
                }
                */
      ]
    },
    employeeInfo: {
      divisionID: mongoose.Types.ObjectId,
      jobID: mongoose.Types.ObjectId,
      branchID: mongoose.Types.ObjectId
    },
    familyInfo: [
      /*
            {
                title: String, // mrs, mr
                fullName: String,
                relationType: String,
                birthOfDate: Date,
                identityNumber: String,
                maritalStatus: String
            }
            */
    ],
    emergencyContacts: [
      /*
            {
                fullName: String,
                relationType: String,
                phoneNumber: String,
                email: String,
                gender: String
            }
            */
    ],
    contract: {
      type: String, // contract | permanent
      hireDate: Date,
      contractUntil: Date
    },
    companyID: mongoose.Types.ObjectId,
    status: String,
    createAt: Date,
    updateAt: Date
  }

interfaces
  .Cities = {
    _id: mongoose.Types.ObjectId,
    cityName: String,
    province: {
      id: String,
      name: String
    },
    country: {
      id: String,
      name: String
    },
    maps: {
      link: String
    },
    createAt: new Date(),
    updateAt: new Date()
  }

interfaces
  .Divisions = {
    _id: mongoose.Types.ObjectId,
    divisionName: String,
    createAt: Date,
    updateAt: Date
  }

interfaces
  .JobList = {
    _id: mongoose.Types.ObjectId,
    code: String,
    title: String,
    createAt: Date,
    updateAt: Date
  }

interfaces
  .BranchesList = {
    _id: mongoose.Types.ObjectId,
    code: String,
    title: String,
    createAt: Date,
    updateAt: Date
  }

interfaces
  .Permissions = {
    _id: mongoose.Types.ObjectId,
    name: String,
    title: String,
    description: String,
    createAt: Date,
    updateAt: Date
  }

interfaces
  .AccessControll = {
    _id: mongoose.Types.ObjectId,
    accountId: mongoose.Types.ObjectId,
    permisions: [
      // hr.administration.employees.add
      // hr.administration.employees.list
      // hr.administration.employees.delete
    ],
    createAt: Date,
    updateAt: Date
  }

module.exports = interfaces
