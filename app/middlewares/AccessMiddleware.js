'use strict'
exports.CanAccess = (can) => {
    return function (req, res, next) {
        try {
            let hasAccess = req.app.locals.Acl.setRole(req.config.user.roleType).can(can)
            if (!hasAccess) throw new Error('Access Denied!')
            next()
        } catch (err) {
            res.status(403).render('page-unauthorized')
        }
    }
}