import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { join } from 'path'
import '../libs/ExtendResponse'

export default (app, express) => {
  /* registering extender for response */
  /*
   *  Register Middleware
   */
  app.use(cookieParser()) // using cookie parser
  app.use(express.static('public', {}))
  app.use(express.json()) // for parsing application/json
  app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
  /**
     *  Load Morgan
     *  Desc : HTTP request logger middleware for node.js
     */
  app.use(morgan('combined'))

  app.set('view engine', 'pug')
  app.set('views', join(__dirname, '../views'))

  return app
}
