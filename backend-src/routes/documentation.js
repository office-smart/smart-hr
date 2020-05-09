'use strict'

const express = require('express')
const router = express.Router()
const apiJSON = require('../services/Swagger')

router.get('/v1', function (req, res) {
  res.render('documentation/doc-v1', { jsonApiSchema: '/documentation/v1/api.json' })
})
router.get('/v1/api.json', function (req, res) {
  res.json(apiJSON)
})

module.exports = router
