'use strict'

const mongoose = require('mongoose')

const schema = new mongoose
    .Schema({
        _id: mongoose.Types.ObjectId,
        username: String,
        password: String,
        email: String,
        status: Number,
        /* 
        apps: {
            hr: {
                access: []
            }
        }
        */
        apps: {},
        roleType: String, // user, admin, 
        createAt: Date,
        updateAt: Date
    })

const model = mongoose.model('users', schema, 'users')

module.exports = model
