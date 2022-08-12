class Employee {
    constructor(first_name, last_name, role_id, manager_id) {
        this.firstName = first_name;
        this.lastName = last_name;
        this.roleID = role_id;
        this.managerID = manager_id;
    }
}

module.exports = Employee;