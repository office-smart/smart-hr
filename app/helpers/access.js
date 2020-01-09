'use strict'

const { result } = require('lodash')

class Acl {
    constructor(access) {
        this.access = access
    }

    setRole(role) {
        this.role = role
        return this
    }

    can(requestAccess) {
        const access = result(this.access, `grants.${this.role}`)
        return access.filter(item => item == requestAccess).length > 0
    }

    getResource() {

    }

    getRole() {

    }

    saveRule() {

    }

    addRole() {

    }

    getAccess(resources = null) {
        const access = result(this.access, `grants.${this.role}`)
        if (resources) {
            return access
        } else {
            return access.filter(item => item.replace(':')[0] === resources)

        }
    }

    addAccess() {

    }

    deleteAccess() {

    }

}

module.exports = Acl