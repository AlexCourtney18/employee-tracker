const mysql = require('mysql2');
const cTable = require('console.table');
const Department = require('./lib/Department');
const index = require('./index');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password',
    database: 'company'
});

const viewDepartments = () => {
    connection.execute(
        `SELECT * FROM departments;`,
        function (err, results) {
            const table = cTable.getTable(results);
            console.log(table);
            index.promptUser();
        }
    );
};

const viewRoles = () => {
    connection.execute(
        `SELECT roles.*, departments.title AS department_name
        FROM roles
        LEFT JOIN departments ON roles.department_id = departments.id
        ORDER BY department_id ASC;`,
        function (err, results) {
            const table = cTable.getTable(results);
            console.log(table);
            index.promptUser();
        }
    );
};

const viewEmployees = () => {
    connection.execute(
        `SELECT * FROM employees;`,
        function (err, results) {
            const table = cTable.getTable(results);
            console.log(table);
            index.promptUser();
        }
    );
};

const addDepartment = department => {
    console.log("ADD DEPARTMENT");
    connection.execute(
        `INSERT INTO departments (title) VALUE ("${department.title}");`,
    );
    viewDepartments();
};

const addRole = role => {
    console.log("ADD ROLE");
    connection.execute(
        `INSERT INTO roles (title, salary, department_id) VALUES ("${role.title}", "${role.salary}", "${role.departmentID}");`,
        );
    viewRoles();
};

const addEmployee = employee => {
    console.log("ADD Employee");
    connection.execute(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${employee.firstName}", "${employee.lastName}", "${employee.roleID}", "${employee.managerID}");`,
        );
    viewEmployees();
};

const updateRole = update => {
    console.log("UPDATE EMPLOYEE");
    connection.execute(
        `UPDATE employees SET role_id = "${update.roleID}" WHERE id = "${update.employeeID}";`,
    );
    viewEmployees();
};



module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateRole
}