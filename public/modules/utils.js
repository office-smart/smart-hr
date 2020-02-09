window.fn = {}
const ls = localStorage

const utils = window.fn
utils.currentToken = ls.getItem('token')

utils.sendXHR = function (opt) {
  if (!opt.headers) opt.headers = {}
  if (utils.currentToken) opt.headers['smart-token'] = utils.currentToken
  return new Promise(function (resolve, reject) {
    opt.success = function (res) {
      resolve(res)
    }
    opt.error = function (err) {
      if (err.status === 402) window.location.href = '/logout'
      reject(err)
    }
    $.ajax(opt)
  })
}

utils.jquery = function (selector) {
  return $(this.selectors[selector] || selector)
}

utils.canAccess = function (access, requestAccess) {
  return access.filter(item => item == requestAccess).length > 0
}

utils.getInputValue = function (selectors) { // selectors => object
  try {
    if (!selectors) throw new Error('No Selector')
    if (Object.keys(selectors).length <= 0) throw new Error('No Selector Defined')
    if (typeof selectors === 'object') {
      const jquerySelectors = {}
      for (const x in selectors) {
        const s = selectors[x]
        jquerySelectors[x] = this.jquery(this.selectors[s] || s).val()
      }
      return jquerySelectors
    } else {
      return this.jquery(this.selectors[selectors] || selectors).val()
    }
  } catch (err) {
    alert(err.message)
  }
}

const currentUser = ls.getItem('username')
$('#current-user').html(currentUser)
