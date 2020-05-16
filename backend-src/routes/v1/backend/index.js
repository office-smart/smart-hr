'use strict'

import AccountRoutes from './AccountsRoutes'
import AuthRoutes from './AuthRoutes'
import CompanyRoutes from './CompanyRoutes'

export default {
  ...AccountRoutes,
  ...AuthRoutes,
  ...CompanyRoutes
}
