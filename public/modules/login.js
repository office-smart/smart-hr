const fn = window.fn

fn.selectors = {
  username: '#input-username',
  password: '#input-password'
}

fn.init = function () {
  fn.ls.clear()
  fn.listenEnter(fn.doLogin)
}

fn.doLogin = function () {
  const data = fn.getInputValue({
    username: 'username',
    password: 'password'
  })
  fn.sendXHR({
    url: '/api/user/login',
    method: 'POST',
    data
  })
    .then(function (res) {
      let currentToken = ''
      const data = res.data
      for (const key in data) {
        fn.ls.setItem(key, data[key])
        if (key === 'token') currentToken = data[key]
      }
      document.cookie = 'smart-token=' + currentToken
      window.location.href = '/dashboard'
    })
    .catch(function (err) {
      alert(err.message)
    })
}

// call init first
fn.init()
