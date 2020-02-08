'use strict'

const lang = require('../languages/index')

const isDev = (process.env.NODE_ENV === 'development')
const loadMenu = (langType = 'EN', active = 'MENU_DASHBOARD') => {
    let menus = [{
        id: 'dashboard',
        class: '',
        icon: 'import_export',
        title: lang(langType, MENU_DASHBOARD),
        link: '/dashboard'
    },{
        id: 'myinfo',
        class: '',
        icon: 'person',
        title: lang(langType, MENU_MYINFO),
        link: '/my-info'
    },{
        id: 'employees',
        class: '',
        icon: 'group',
        title: lang(langType, MENU_EMPLOYEES),
        link: '/employees'
    },{
        id: 'timeoff',
        class: '',
        icon: 'do_not_disturb_off',
        title: lang(langType, MENU_TIMEOFF),
        link: '/timeoff'
    },{
        id: 'payroll',
        class: '',
        icon: 'monetization_on',
        title: lang(langType, MENU_PAYROLL),
        link: '/payroll'
    },{
        id: 'calendar',
        class: '',
        icon: 'perm_contact_calendar',
        title: lang(langType, MENU_CALENDAR),
        link: '/calendar'
    },{
        id: 'tasks',
        class: '',
        icon: 'memory',
        title: lang(langType, MENU_TASKS),
        link: '/tasks'
    },{
        id: 'administration',
        class: '',
        icon: 'tune',
        title: lang(langType, MENU_ADMINISTRATION),
        link: '/administration'
    }]
    return menus.map(x => {
        if (active === x.id) x.class = 'active'
        return x
    })
}

let controller = {}

controller.login = (req, res) => {
    res.render('login', { title: 'Login', isDev })
}
controller.logout = (req, res) => {
    res.redirect('/login')
}
controller.register = (req, res) => {
    res.render('register', { title: 'Register', isDev })
}
controller.forgot= (req, res) => {
    res.render('forgot', { title: 'Forgot Password', isDev })
}
controller.dashboard = async (req, res) => {
    console.log(req.config)
    res.render('dashboard', { config: req.config, menus: loadMenu(req.lang, 'dashboard'), title: 'Dashboard' , isDev })
}
controller.myinfo = (req, res) => {
    res.render('my-info', {config: req.config, menus: loadMenu(req.lang, 'myinfo'), title: "My Info", isDev })
}
controller.employees = (req, res) => {
    res.render('employees', {config: req.config, menus: loadMenu(req.lang, 'employees'), title: "Employees", isDev })
}
controller.timeoff = (req, res) => {
    res.render('timeoff', {config: req.config, menus: loadMenu(req.lang, 'timeoff'), title: "Time Off", isDev })
}
controller.payroll = (req, res) => {
    res.render('payroll', {config: req.config, menus: loadMenu(req.lang, 'payroll'), title: "Payroll", isDev })
}
controller.calendar = (req, res) => {
    res.render('calendar', {config: req.config, menus: loadMenu(req.lang, 'calendar'), title: "Calendar", isDev })
}
controller.tasks = (req, res) => {
    res.render('tasks', {config: req.config, menus: loadMenu(req.lang, 'tasks'), title: "Tasks", isDev })
}
controller.myinbox = (req, res) => {
    res.render('my-inbox', {config: req.config, menus: loadMenu(req.lang, 'myinbox'), title: "My Inbox", isDev })
}
controller.approval = (req, res) => {
    res.render('approval', {config: req.config, menus: loadMenu(req.lang, 'approval'), title: "Approval", isDev })
}
controller.administration = (req, res) => {
    res.render('administration', {config: req.config, menus: loadMenu(req.lang, 'administration'), title: "Administration", isDev })
}

module.exports = controller
