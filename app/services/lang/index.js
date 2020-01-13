const { result } = require('lodash')
const lang = {
  en: require('./en'),
  id: {}
}

exports.menus = function (type = 'en', active = 'dashboard') {
  const m = lang[type].menus
  const menus = [{
    id: 'dashboard',
    class: '',
    icon: 'import_export',
    title: m.dashboard,
    link: '/dashboard'
  }, {
    id: 'myinfo',
    class: '',
    icon: 'person',
    title: m.myinfo,
    link: '/my-info'
  }, {
    id: 'employees',
    class: '',
    icon: 'group',
    title: m.employees,
    link: '/employees'
  }, {
    id: 'timeoff',
    class: '',
    icon: 'do_not_disturb_off',
    title: m.timeoff,
    link: '/timeoff'
  }, {
    id: 'payroll',
    class: '',
    icon: 'monetization_on',
    title: m.payroll,
    link: '/payroll'
  }, {
    id: 'calendar',
    class: '',
    icon: 'perm_contact_calendar',
    title: m.calendar,
    link: '/calendar'
  }, {
    id: 'tasks',
    class: '',
    icon: 'memory',
    title: m.tasks,
    link: '/tasks'
  }, {
    id: 'users',
    class: '',
    icon: 'supervisor_account',
    title: m.users,
    link: '/users'
  }, {
    id: 'roles',
    class: '',
    icon: 'supervisor_account',
    title: m.roles,
    link: '/roles'
  }]
  return menus.map(x => {
    if (active === x.id) x.class = 'active'
    return x
  })
}
