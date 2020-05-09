'use strict'

// const {
//   Clients,
//   CompanyInformation,
//   Accounts,
//   Services,
//   Employees,
//   Permissionsm,
//   AccountAccess
// } = require('../interfaces/ModelInterfaces')

const collections = [
  'Clients',
  'CompanyInformation',
  'Accounts',
  'Services',
  'Employees',
  'Permissions',
  'AccountAccess'
]

const options = (data) => {
//   const x = new Select(data)
//   return x.start()
}

const collectData = async (input, data) => {
  const inputData = {}
  for (const key in data) {
    if (data[key].type === 'options') {
      inputData[key] = options(data[key].data)
    } else {
      console.log(`\n${data[key].title}`)
      inputData[key] = await input('>> : ')
    }
  }
  return inputData
}

const inputText = (title) => {
  return {
    type: 'text',
    title
  }
}
const inputOptions = (title, data) => {
  const obj = {
    question: title,
    options: [],
    answers: [],
    pointer: '>',
    color: 'magenta'
  }
  if (data && data[0]) {
    for (const a of data) {
      obj.options.push(a)
      obj.answers.push(a)
    }
  } else {
    for (const a in data) {
      obj.options.push(data[a])
      obj.answers.push(a)
    }
  }
  return {
    type: 'options',
    title,
    data: obj || data
  }
}

const scenario = {}

scenario.Clients = async (input) => {
  const model = {
    name: inputText('Client Name [String - any]'),
    services: inputOptions('Services [String - options]', ['smart-hr', 'smart-ga', 'smart-accounting', 'smart-warehouse', 'smart-safety', 'smart-wt', 'smart-qa', 'smart-engineering', 'smart-purchasing', 'smart-ppc'])
  }
  await collectData(input, model)
}
scenario.CompanyInformation = async (input) => {
}
scenario.Accounts = async (input) => {
}
scenario.Services = async (input) => {
}
scenario.Employees = async (input) => {
}
scenario.Permissions = async (input) => {
}
scenario.AccountAccess = async (input) => {
}

const command = {}

command.handle = async ({ args }, input) => {
  console.log(`Set collection [${collections.join('|')}]`)
  const collection = await input('>> :')
  await scenario[collection](input)
}

module.exports = command
