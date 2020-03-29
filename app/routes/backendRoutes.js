'use strict'

const express = require('express')
const router = express.Router()

const controllers = require('../controllers')
const backendRoutersV1 = require('./v1/backend')

function getController (name = '') {
  const splitter = name.split('.')
  let ctrl = null
  for (const x of splitter) {
    if (!ctrl && controllers[x]) {
      ctrl = controllers[x]
    } else {
      if (ctrl[x]) {
        ctrl = ctrl[x]
      }
    }
  }
  return ctrl
}

for (const routes in backendRoutersV1) {
  try {
    const { method, path, controller, beforeController, afterController } = backendRoutersV1[routes]
    const ctrl = getController(controller)
    if (!ctrl) throw new Error(`Invalid Controller Named ${controller}`)
    if (typeof ctrl !== 'function') throw new Error(`${controller} is Not a Function`)
    console.log(`[backend] registering route ${path}`)
    if (method === 'GET') {
      router.get(path, [...beforeController, async function (req, res, next) {
        try {
          // res.send('ok')
          const config = req.config || {}
          await ctrl({ req, res, config }, next)
        } catch (err) {
          next(err)
        }
      }, ...afterController])
    } else if (method === 'POST') {
      router.post(path, [...beforeController, async function (req, res, next) {
        try {
          // res.send('ok')
          const config = req.config || {}
          await ctrl({ req, res, config }, next)
        } catch (err) {
          next(err)
        }
      }, ...afterController])
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = router
