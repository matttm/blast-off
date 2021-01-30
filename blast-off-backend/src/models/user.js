
class User {
    constructor(id, created, role, firstName, lastName, brokerageAccounts) {
        this.id = id;
        this.created = created;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.brokerageAccounts = brokerageAccounts;
    }
}

module.exports = {
    User
};
