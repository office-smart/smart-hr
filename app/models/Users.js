'use strict'

const mongoose = require('mongoose')
const MODEL_NAME = 'users'

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

module.exports = mongoose.model(MODEL_NAME, schema, MODEL_NAME)
