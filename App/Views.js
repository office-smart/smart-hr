'use strict'

require('./Components/Providers/response')

class Views {
  constructor (depsInjection) {
    this.deps = depsInjection
  }

  app (app) {
    this.app = app
    return this
  }

  registerViews () {
    const {
      express,
      cookieParser,
      morgan,
      path: { join }
    } = this.deps

    /* get app context */
    const App = this.app
    /* registering extender for response */
    /*
    *  Register Middleware
    */
    App.use(cookieParser()) // using cookie parser
    App.use(express.static('public', {}))
    App.use(express.json()) // for parsing application/json
    App.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    /**
       *  Load Morgan
       *  Desc : HTTP request logger middleware for node.js
       */
    App.use(morgan('combined'))

    App.set('view engine', 'pug')
    App.set('views', join(__dirname, 'Components/Views'))

    return this.app
  }
}

module.exports = (depsInjection) => {
  return new Views(depsInjection)
}
