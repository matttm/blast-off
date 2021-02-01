
class User {
    constructor(id, role, firstName, lastName, brokerageAccounts) {
        this.id = id;
        this.created = new Date().toDateString();
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.brokerageAccounts = brokerageAccounts;
    }
}

module.exports = {
    User
};
