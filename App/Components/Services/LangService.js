'use strict'

class LangService {
  constructor (config = {}) {
    this.config = config
  }

  setAllLang (languages = {}) {
    this.languages = languages
  }

  setLang (type = 'EN') {
    this.config.selectedLang = type
    this.currentLang = this.languages[type] || {}
  }

  getList (key) {
    return this.currentLang[key]
  }
}

module.exports = function (config) {
  return new LangService(config)
}
