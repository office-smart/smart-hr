// 'use strict'

// import {
//   Clients,
//   CompanyInformation,
//   Accounts,
//   Services,
//   Employees,
//   Permissionsm,
//   AccountAccess
// } from '../interfaces/ModelInterfaces'

// const collections = [
//   'Clients',
//   'CompanyInformation',
//   'Accounts',
//   'Services',
//   'Employees',
//   'Permissions',
//   'AccountAccess'
// ]

// const options = (data) => {
//   const x = new Select(data)
//   return x.start()
// }

// const collectData = async (input, data) => {
//   try {
//     const inputData = {}
//     for (const key in data) {
//       if (data[key].type === 'options') {
//         inputData[key] = options(data[key].data)
//       } else {
//         console.log(`\n${data[key].title}`)
//         inputData[key] = await input('>> : ')
//       }
//     }
//     return inputData
//   } catch (err) {
//     throw err
//   }
// }

// const inputText = (title) => {
//   return {
//     type: 'text',
//     title
//   }
// }
// const inputOptions = (title, data) => {
//   const obj = {
//     question: title,
//     options: [],
//     answers: [],
//     pointer: '>',
//     color: 'magenta'
//   }
//   if (data && data[0]) {
//     for (const a of data) {
//       obj.options.push(a)
//       obj.answers.push(a)
//     }
//   } else {
//     for (const a in data) {
//       obj.options.push(data[a])
//       obj.answers.push(a)
//     }
//   }
//   return {
//     type: 'options',
//     title,
//     data: obj || data
//   }
// }

// const scenario = {}

// scenario.Clients = async (input) => {
//   try {
//     const model = {
//       name: inputText('Client Name [String - any]'),
//       services: inputOptions('Services [String - options]', ['smart-hr', 'smart-ga', 'smart-accounting', 'smart-warehouse', 'smart-safety', 'smart-wt', 'smart-qa', 'smart-engineering', 'smart-purchasing', 'smart-ppc'])
//     }
//     const data = await collectData(input, model)
//   } catch (err) {
//     throw err
//   }
// }
// scenario.CompanyInformation = async (input) => {
//   try {
//     //
//   } catch (err) {
//     throw err
//   }
// }
// scenario.Accounts = async (input) => {
//   try {
//     //
//   } catch (err) {
//     throw err
//   }
// }
// scenario.Services = async (input) => {
//   try {
//     //
//   } catch (err) {
//     throw err
//   }
// }
// scenario.Employees = async (input) => {
//   try {
//     //
//   } catch (err) {
//     throw err
//   }
// }
// scenario.Permissions = async (input) => {
//   try {
//     //
//   } catch (err) {
//     throw err
//   }
// }
// scenario.AccountAccess = async (input) => {
//   try {
//     //
//   } catch (err) {
//     throw err
//   }
// }

// const command = {}

// command.handle = async ({ args }, input) => {
//   try {
//     console.log(`Set collection [${collections.join('|')}]`)
//     const collection = await input('>> :')
//     await scenario[collection](input)
//   } catch (err) {
//     throw err
//   }
// }

// export default command