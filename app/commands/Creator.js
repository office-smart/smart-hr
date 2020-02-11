'use strict'

const collections = ['Clients', 'CompanyInformation', 'Accounts', 'Services', 'Employees', 'Permissions', 'AccountAccess']

const scenario = {}
scenario.Clients = async () => {
    try {
        console.log('helo')
    } catch (err) {
        throw err
    }
}
scenario.CompanyInformation = async () => {
    try {
        // 
    } catch (err) {
        throw err
    }
}
scenario.Accounts = async () => {
    try {
        // 
    } catch (err) {
        throw err
    }
}
scenario.Services = async () => {
    try {
        // 
    } catch (err) {
        throw err
    }
}
scenario.Employees = async () => {
    try {
        // 
    } catch (err) {
        throw err
    }
}
scenario.Permissions = async () => {
    try {
        // 
    } catch (err) {
        throw err
    }
}
scenario.AccountAccess = async () => {
    try {
        // 
    } catch (err) {
        throw err
    }
}

let command = {}

command.handle = async ({ args }, input) => {
    try {
        const collection = await input(`Set collection [${collections.join('|')}]: `)
        await scenario[collection]()
    } catch (err) {
        throw err
    }
}

module.exports = command
