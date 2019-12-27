'use strict'

const mongoose = require('mongoose')

const schema = new mongoose
    .Schema({
        _id: mongoose.Types.ObjectId,
        userId: String,
        username: String,
        password: String,
        email: String,
        status: Number,
        roleType: String,
        createAt: Date,
        updateAt: Date
    })

const model = mongoose.model('users', schema, 'users')

module.exports = model
