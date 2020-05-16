import { join } from 'path';
import { result } from 'lodash';
import fs from 'fs';

class Acl {
  constructor(data) {
    this.data = data;
  }

  setRole(role) {
    this.role = role;
    return this;
  }

  can(requestAccess) {
    const access = result(this.data, `grants.${this.role}`);
    return access.filter(item => item === requestAccess).length > 0;
  }

  getResources(resourceType) {
    const resources = result(this.data, 'resources', []);
    if (resourceType && resources.length > 0) {
      return resources.filter(e => e === resourceType);
    } else {
      return resources;
    }
  }

  getRoles() {
    return result(this.data, 'roles', []);
  }

  saveRule() {
    return fs.writeFileSync(join(__dirname, '/acl/acl.json'), JSON.stringify(this.data));
  }

  addRole(newRole) {
    const role = result(this.data, 'roles', []);
    role.push(newRole);
    return this;
  }

  deleteRole(roleTarget) {
    this.data.roles = this.data.roles.filter(e => e !== roleTarget);
  }

  getAccessByResource(resources = null, role = null) {
    const access = result(this.data, `grants.${role || this.role}`);
    if (resources) {
      return access;
    } else {
      return access.filter(item => item.replace(':')[0] === resources);
    }
  }

  setAcces(access = [], role = null) {
    role = role || this.role;
    this.data.grants[role] = [];
    if (typeof access === 'string') {
      this.data.grants[role].push(access);
    } else {
      access.map(e => this.data.grants[role].push(e));
    }
    return this;
  }

  deleteAccess(permission, role) {
    role = role || this.role;
    this.data.grants[role] = this.data.grants[role].filter(e => e !== role + ':' + permission);
  }

  getAccessByPermission(permission = null, role = null) {
    const access = this.data.grants[role];
    if (access && access.length > 0) {
      return access.filter(e => e.split(':')[1] === permission).map(e => e.split(':')[0]);
    } else {
      return [];
    }
  }
}

export default Acl;