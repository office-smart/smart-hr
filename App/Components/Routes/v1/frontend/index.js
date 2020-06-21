'use strict'

// middlewares
const { AuthMiddleware } = require('../../../middlewares')

module.exports = {
  // dynamic assets
  'js.identity': {
    method: 'GET',
    path: '/modules/identity/clients.min.js',
    controller: 'AssetsController.clientIdentity',
    afterController: [], // the middlewares fires after execute the controller function
    beforeController: [] // the middlewares fires before execute the controller function
  },
  'view.home': {
    method: 'GET',
    path: '/',
    controller: 'ViewController.dashboard',
    afterController: [], // the middlewares fires after execute the controller function
    beforeController: [] // the middlewares fires before execute the controller function
  },
  'view.login': {
    method: 'GET',
    path: '/login',
    controller: 'ViewController.login',
    afterController: [],
    beforeController: []
  },
  'view.logout': {
    method: 'GET',
    path: '/logout',
    controller: 'ViewController.logout',
    afterController: [],
    beforeController: []
  },
  'view.forgot': {
    method: 'GET',
    path: '/forgot',
    controller: 'ViewController.forgot',
    afterController: [],
    beforeController: [
      AuthMiddleware.getAccess(['hr.menu.forgot'])
    ]
  },
  'view.dashboard': {
    method: 'GET',
    path: '/dashboard',
    controller: 'ViewController.dashboard',
    afterController: [],
    beforeController: [
      AuthMiddleware.getAccess(['hr.menu.dashboard'])
    ]
  },
  'view.my-info': {
    method: 'GET',
    path: '/my-info',
    controller: 'ViewController.myinfo',
    afterController: [],
    beforeController: [
      AuthMiddleware.getAccess(['hr.menu.my-info'])
    ]
  },
  'view.employees': {
    method: 'GET',
    path: '/employees',
    controller: 'ViewController.employees',
    afterController: [],
    beforeController: [
      AuthMiddleware.getAccess(['hr.menu.employees'])
    ]
  },
  'view.timeoff': {
    method: 'GET',
    path: '/timeoff',
    controller: 'ViewController.timeoff',
    afterController: [],
    beforeController: [
      AuthMiddleware.getAccess(['hr.menu.timeoff'])
    ]
  },
  'view.overtime': {
    method: 'GET',
    path: '/overtime',
    controller: 'ViewController.overtime',
    afterController: [],
    beforeController: [
      AuthMiddleware.getAccess(['hr.menu.overtime'])
    ]
  },
  'view.payroll': {
    method: 'GET',
    path: '/payroll',
    controller: 'ViewController.payroll',
    afterController: [],
    beforeController: [
      AuthMiddleware.getAccess(['hr.menu.payroll'])
    ]
  },
  'view.calendar': {
    method: 'GET',
    path: '/calendar',
    controller: 'ViewController.calendar',
    afterController: [],
    beforeController: [
      AuthMiddleware.getAccess(['hr.menu.calendar'])
    ]
  },
  'view.tasks': {
    method: 'GET',
    path: '/tasks',
    controller: 'ViewController.tasks',
    afterController: [],
    beforeController: [
      AuthMiddleware.getAccess(['hr.menu.tasks'])
    ]
  },
  'view.my-inbox': {
    method: 'GET',
    path: '/my-inbox',
    controller: 'ViewController.myinbox',
    afterController: [],
    beforeController: [
      AuthMiddleware.getAccess(['hr.menu.my-inbox'])
    ]
  },
  'view.approval': {
    method: 'GET',
    path: '/approval',
    controller: 'ViewController.approval',
    afterController: [],
    beforeController: [
      AuthMiddleware.getAccess(['hr.menu.approval'])
    ]
  },
  'view.administration': {
    method: 'GET',
    path: '/administration',
    controller: 'ViewController.administration',
    afterController: [],
    beforeController: [
      AuthMiddleware.getAccess(['hr.menu.administration'])
    ]
  }
}
