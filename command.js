'use strict'

const readline = require('readline')

const input = (text = '?') => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    return new Promise((resolve, reject) => {
        rl.question(text, (value) => {
            rl.close()
            resolve(value)
        });
    })
}

const list = {
    'creator': './app/commands/Creator'
}

const argv = process.argv
const commandType = list[argv[2]]
const args = argv
    .slice(3, argv.length)
    .map(x => x.split('=', 1))
    .reduce((r, x) => {
        r[x[0]] = x[1] || x[0]
        return r
    }, {})


if (!commandType) return console.log('Invalid Command Type')

const cmd = require(commandType)

cmd.handle({ args }, input)
    .catch(console.error)
