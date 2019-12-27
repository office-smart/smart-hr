'use strict'

let validator = {}

validator.required = function (input = {}) {
    try {
        for (const key in input) {
            const value = input[o]
            if (!value || (value && value.length <= 0)) throw new Error(`${key} required`)
        }
    } catch (err) {
        throw err
    }
}
module.exports = validator
