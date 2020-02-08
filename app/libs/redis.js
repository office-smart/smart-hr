'use strict'

const redis = require('redis')

const REDISURI = process.env.REDIS_URI

let client = null

module.exports = {
    createRedisConnection: () => {
        return new Promise((resolve, reject) => {
            client = redis.createClient({
                url: REDISURI
            })
            
            client.on('error', (err) => {
                console.log(err)
                return reject(err)
            })
            
            client.on('connect', () => {
                console.log('( √ ) redis')
                return resolve()
            })
            
            client.on('reconnecting', () => {
                console.log('( redis ) reconnecting')
            })
            
            client.on('end', () => {
                console.log('( redis ) end connection')
                return reject()
            })
        })
    },
    set: ({key, value, exp}) => {
        client.set(key, value, 'EX', exp)
    },
    get: (key) => {
        return new Promise((resolve, reject) => {
            client.get(key, (err, data) => {
                if (err) return reject(err)
                resolve(data)
            })
        })
    }
}