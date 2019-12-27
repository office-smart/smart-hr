'use strict'

const mongoose = require('mongoose')

const schema = new mongoose
    .Schema({
        _id: mongoose.Types.ObjectId,
        kodeProduct: String,
        userId: String,
        namaProduct: String,
        stok: Number,
        keterangan: String,
        createAt: Date,
        updateAt: Date
    })

const model = mongoose.model('products', schema, 'products')

module.exports = model
