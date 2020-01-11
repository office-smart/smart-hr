const fn = window.fn

fn.selectors = {
  username: '#input-username',
  password: '#input-password'
}

fn.init = function () {
  ls.clear()
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
      for (const key in res) {
        ls.setItem(key, res[key])
        if (key === 'token') currentToken = res[key]
      }
      document.cookie = 'x_stok_key=' + currentToken
      window.location.href = '/users'
    })
    .catch(function (err) {
      alert(err.message)
    })
}

// call init first
fn.init()
