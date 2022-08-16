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
            index.promptConfirm();
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
            index.promptConfirm();
        }
    );
};

const viewEmployees = () => {
    connection.execute(
        `SELECT employees.id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS job_title, roles.salary AS salary, departments.title AS department_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id AND employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees manager ON employees.manager_id = manager.id;`,
        function (err, results) {
            const table = cTable.getTable(results);
            console.log(table);
            index.promptConfirm();
        }
    );
};

const addDepartment = department => {
    connection.execute(
        `INSERT INTO departments (title) VALUE ("${department.title}");`,
    );
    viewDepartments();
};

const addRole = role => {
    connection.execute(
        `INSERT INTO roles (title, salary, department_id) VALUES ("${role.title}", "${role.salary}", "${role.departmentID}");`,
        );
    viewRoles();
};

const addEmployee = employee => {
    connection.execute(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${employee.firstName}", "${employee.lastName}", "${employee.roleID}", "${employee.managerID}");`,
        );
    viewEmployees();
};

const updateRole = update => {
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