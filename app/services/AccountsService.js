'use strict'

const md5 = require('md5')
const AccountsModel = require('../models/AccountsModel')
const AccessControllModel = require('../models/AccessControllModel')
const { Accounts: AccountInterface } = require('../interfaces/ModelInterfaces')
const lang = require('../languages/index')
const { set } = require('../libs/redis')
const exp = 12 * 60 * 60

const ErrorLoginInvalid = lang('EN', 'E_INVALID_USERNAME')

let service = {}

service.login = async ({ username, password }) => {
    try {
        const isUsername = (username && username.length > 0)
        const isPassword = (password && password.length > 0)
        const isValid = isUsername && isPassword
        if (!isValid) throw new Error(ErrorLoginInvalid)
        const form = {
            username,
            password: md5(password)
        }
        const newExp = new Date().getTime() + exp
        const data = this.getLoginInfo(form)
        const lang = (data['lang'] || 'EN').toUpperCase()
        const stringData = JSON.stringify({ userid: data['_id'], username, roleType, lang, exp: newExp })
        const key = md5(stringData)
        set({ key, value: stringData, exp }) // 12 jam
        return { token: key, username, roleType, exp: newExp }
    } catch (err) {
        throw err
    }
}
service.getAccessInfo = async ({accountId}) => {
    try {
        const access = await AccessControllModel.findOne({accountId})
    } catch (err) {
        throw err
    }
}
service.getLoginInfo = async ({username, password}) => {
    try {
        let data = await AccountsModel.findOne({username, password})
        if (!data) throw new Error(ErrorLoginInvalid)
        if (data['status'] === 'banned') throw new Error('Account Was Banned By System')
        if (data['status'] === 'tmp-banned') throw new Error('Account Was Temporary Banned By System')
        if (data['status'] === 'need-verify') throw new Error('Unverified Account. Please Check Your Email Verification')
        return data
    } catch (err) {
        throw err
    }
}
service.getUsers = async ({ username, email, status, page, limit }, myusername) => {
    try {
        let criteria = {}
        criteria['username'] = {
            '$ne': myusername
        }
        if (username) criteria['username']['$eq'] = new RegExp(username)
        if (email) criteria['email'] = email
        if (status) criteria['status'] = parseInt(status)
        limit = (limit && parseInt(limit) > 0) ? parseInt(limit) : 10
        page = (page && parseInt(page)) ? parseInt(page) : 1
        const skip = (page - 1) * limit
        const data = await AccountsModel.find(criteria).skip(skip).limit(limit)
        let row = []
        for (const r of data) {
            const {email: e, username: u, roleType, status: s, userId, createdAt, updateAt} = r
            row.push({email: e, username: u, roleType, status: s, userId, createdAt, updateAt})
        }
        return row
    } catch (err) {
        throw err
    }
}
service.getNewUserID = async () => {
    try {
        const pattern = 'U-000'
        const { userId } = await AccountsModel.findOne({}).sort({$natural: -1})
        const lastId = `${parseInt(userId.replace('U-', '')) + 1}`
        const lenChar = lastId.length
        const newId = pattern.substring(0, pattern.length - lenChar) + lastId
        return newId
    } catch (err) {
        throw err
    }
}
service.checkExists = async (username) => {
    try {
        const exists = await AccountsModel.findOne({username})
        if (exists) throw new Error(`${username} already exists!`)
    } catch (err) {
        throw err
    }
}
service.create = async ({ username, password, confirm, email, roleType }) => {
    try {
        if (password !== confirm) throw new Error('Password Doesnt Match')
        roleType = roleType === 'admin' ? 'admin' : 'user'
        await service.checkExists(username)
        const data = await AccountsModel.updateOne({username}, {
            $setOnInsert: {
                _id: null,
                userId: await service.getNewUserID(),
                username,
                password: md5(password),
                email,
                status: 1,
                roleType,
                createAt: new Date(),
            },
            $set: {
                updateAt: new Date()
            }
        }, { upsert: true })
        return data
    } catch (err) {
        throw err
    }
}

module.exports = service
