'use strict'

const { result } = require('lodash')
const all = require('require-all')
const configs = all('Components/Config')

module.exports = {
  get: function (key, defaultVal) {
    return result(configs, key, defaultVal)
  }
}
