'use strict'

const { response } = require('express')
const isProd = process.env.NODE_ENV === 'production'

response.api200 = function (data, message = 'success', properties) {
  const res = { statusCode: 200, message }
  if (data) res.data = data
  if (data && data[0]) res.total = data.length
  this.status(200).send(res)
}

response.api400 = function (err) {
  if (err instanceof Error) {
    const res = { statusCode: 400, message: (err.message || 'Bad Request') }
    if (!isProd) res.stack = err.stack.split('\n')
    this.status(400).send(res)
  } else {
    this.status(500).send('Invalid Output Format')
  }
}
