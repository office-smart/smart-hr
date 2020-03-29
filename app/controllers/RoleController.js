// 'use strict'

// const { InternalError } = require('../libs/ErrorHandler')

// class RoleController {
//   async getRoles (req, res, next) {
//     try {
//       const Acl = req.app.locals.Acl
//       const results = { roles: [], resources: Acl.getResources() }
//       const roles = Acl.getRoles()
//       for (const role of roles) {
//         results.roles.push({
//           role,
//           create: Acl.getAccessByPermission('create', role),
//           edit: Acl.getAccessByPermission('edit', role),
//           delete: Acl.getAccessByPermission('delete', role),
//           read: Acl.getAccessByPermission('read', role),
//           visit: Acl.getAccessByPermission('visit', role)
//         })
//       }
//       res.send({
//         code: 200,
//         status: 'OK',
//         message: 'sucess',
//         data: {
//           ...results,
//           access: Acl.getAccessByResource('role')
//         }
//       })
//     } catch (err) {
//       next(new InternalError({ message: 'something error happen', stack: err.toString() }))
//     }
//   }

//   async delete (req, res, next) {
//     try {
//     } catch (err) {
//       next(new InternalError({ message: 'something error happen', stack: err.toString() }))
//     }
//   }

//   async create (req, res, next) {
//     try {
//       const Acl = req.app.locals.Acl
//       const { access, name } = req.body
//       Acl.addRole(name).setAcces(access, name).saveRule()
//       res.send({
//         code: 200,
//         status: 'OK',
//         message: 'sucess'
//       })
//     } catch (err) {
//       next(new InternalError({ message: 'something error happen', stack: err.toString() }))
//     }
//   }

//   async edit (req, res, next) {
//     try {
//     } catch (err) {
//       next(new InternalError({ message: 'something error happen', stack: err.toString() }))
//     }
//   }
// }

// module.exports = RoleController
