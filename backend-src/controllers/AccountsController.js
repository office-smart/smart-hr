'use strict'

/* services */
import AccountsService from '../services/AccountsService'

class AccountsController {
  async getAccounts ({ req, res }, next) {
    try {
      // const access = getAccess(req.roleAccess, 'users')
      const items = await AccountsService.getAccountsBy(req.query)
      res.api200({ access: [], items })
    } catch (err) {
      res.api400()
    }
  }

  async create ({ req, res }, next) {
    try {
      const data = await AccountsService.create(req.body)
      res.send(data)
    } catch (err) {
      res.api400(err)
    }
  }
}

export default AccountsController
