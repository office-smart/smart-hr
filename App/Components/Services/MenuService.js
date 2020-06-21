'use strict'

class MenuService {
  constructor ({ LangService }) {
    this.langType = 'EN'
    this.list = {}
    this.LangService = LangService
  }

  setLangType (type = 'EN') {
    this.langType = type
    return this
  }

  getMenu (active = 'dashboard') {
    return this.list.map(x => {
      x.title = this.LangService({ lang: this.langType })
      if (active === x.id) x.class = 'active'
      return x
    })
  }
}

module.exports = function (injection) {
  return new MenuService(injection)
}
