const fn = window.fn

fn.selectors = {
  contentUser: '#users-content',
  btnAdd: '#modal-trigger-add',
  formUsername: '#username',
  formEmail: '#email',
  formRole: '#role',
  formPassword: '#password',
  formConfirm: '#confirm',
  formDescription: '#description'
}

fn.init = function () {
  fn.listNumber = 0
  fn.getUsers()
}

fn.loadingUser = function () {
  fn.jquery('contentUser').html('<tr><td colspan="6">Loading...</td></tr>')
}

fn.getUsers = function () {
  try {
    fn.sendXHR({
      url: '/api/users',
      method: 'GET',
      beforeSend: function () {
        fn.loadingUser()
      },
      data: {}
    })
      .then(function (resp) {
        fn.updateRowUserData(resp.data)
      })
      .catch(function (err) {
        throw err
      })
  } catch (err) {
    console.error(err)
  }
}

fn.updateRowUserData = function (data) {
  const access = data.access || {}
  if (fn.canAccess(access, 'user:create')) {
    fn.jquery('btnAdd').removeClass('hide')
  } else {
    fn.jquery('btnAdd').addClass('hide')
  }
  const editActions = fn.canAccess(access, 'user:edit') ? '<a class=\'list-group-item list-group-item-warning\' href=\'javascript:void(0);\' onclick=\'fn.edit()\'>Edit</a>' : ''
  const removeActions = fn.canAccess(access, 'user:delete') ? '<a class=\'list-group-item list-group-item-danger\' href=\'javascript:void(0);\' onclick=\'fn.delete()\'>Delete</a>' : ''

  const accessList = `
        <div class='list-group pmd-z-depth pmd-list pmd-card-list'>
            ${editActions}
            ${removeActions}
        </div>`
  let rows = data.items.map((r) => {
    fn.listNumber += 1
    const currentClass = r.status ? 'border-green' : 'border-red'
    const row = `<tr>
                <td data-title="#" class="${currentClass}">${fn.listNumber}</td>
                <td data-title="Role Type">${r.roleType}</td>
                <td data-title="User ID">${r.userId}</td>
                <td data-title="Username">${r.username}</td>
                <td data-title="Email">${r.email}</td>
                <td data-title="Status">${r.status ? 'active' : 'inactive'}</td>
                <td data-title="Action">
                    <a href="javascript:void(0);"
                        data-trigger="click"
                        data-class="custom-popover"
                        title="Available Actions"
                        data-toggle="popover"
                        data-placement="bottom"
                        data-content="${accessList}"
                        data-html="true">
                            <i class="material-icons md-dark pmd-sm">more_vert</i>
                    </a>
                </td>
            </tr>`
    return row
  })
  if (rows.length === 0) rows = ['<tr><td colspan="6"> Data Not Found</td></tr>']
  fn.jquery('contentUser').html(rows.join(' '))
  fn.activatePopover()
}

fn.activatePopover = function () {
  fn.jquery('[data-toggle="popover"]').popover()
}

fn.getValueFromModalUser = function () {
  return {
    username: fn.getInputValue('formUsername'),
    email: fn.getInputValue('formEmail'),
    role: fn.getInputValue('formRole'),
    password: fn.getInputValue('formPassword'),
    confirm: fn.getInputValue('formConfirm'),
    description: fn.getInputValue('formDescription')
  }
}

fn.createNewUser = function () {
  try {
    const data = fn.getValueFromModalUser()
    console.log(data)
    if (data.password !== data.confirm) throw new Error('Password Doesn\'t Match')
    fn.sendXHR({
      url: '/api/users/create',
      method: 'POST',
      data
    })
      .then(function () {
        fn.getUsers()
      })
      .catch(function (err) {
        throw err
      })
  } catch (err) {
    alert(err.message)
  }
}

fn.edit = function () {

}

// init first time
fn.init()
