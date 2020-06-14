'use strict'

/* services */
const AssetsService = require('../services/AssetsService')

class AssetsController {
  async clientIdentity ({ req, res }, next) {
    try {
      const script = await AssetsService.getClientIdentityScript(req.ip)
      res.type('text/javascript').send(script)
    } catch (err) {
      res.api400()
    }
  }
}

module.exports = AssetsController
