
class User {
    constructor(id, firstName, lastName, role, accounts) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.accounts = accounts;
    }
}

module.exports = {
    User
};
