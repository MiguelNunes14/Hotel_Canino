const Roles = require('../../security/roles');

module.exports = class UserRoleChecker {
    static isPetOwner(currentUser) {
        if(!currentUser || !currentUser.roles) {
            return false;
        }

        return !currentUser.roles.some((role) => {
            return [
                Roles.values.manager,
                Roles.values.user,
            ].includes(role);
        });
    }

    static isManager(currentUser) {
        if(!currentUser || !currentUser.roles) {
            return false;
        }

        return currentUser.roles.some((role) => {
            return role === Roles.values.manager;
        });
    }
}