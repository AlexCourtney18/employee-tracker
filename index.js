const mysql = require('mysql2');
const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateRole } = require('./commands');
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');
const Update = require('./lib/Update');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password',
    database: 'company'
});

const promptUser = () => {
    console.log(`
    ================================
    Welcome to Employee Tracker 9000
    ================================
    `);
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: "What would you like to do?",
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
        },
    ])
        .then(choice => {
            if (choice.menu === 'View All Departments') {
                console.log('View All Departments');
                viewDepartments();
            } else if (choice.menu === 'View All Roles') {
                console.log('View All Roles');
                viewRoles();
            } else if (choice.menu === 'View All Employees') {
                console.log('View All Employees');
                viewEmployees();
            } else if (choice.menu === 'Add a Department') {
                console.log('Add a Department');
                promptDepartment();
            } else if (choice.menu === 'Add a Role') {
                console.log('Add a Role');
                promptRole();
            } else if (choice.menu === 'Add an Employee') {
                console.log('Add an Employee');
                promptEmployee();
            } else if (choice.menu === 'Update an Employee Role') {
                console.log('Update an Employee Role');
                promptUpdate();
            }
        })
}

const promptDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: "Please enter the Department name. (Required)",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else console.log("Please enter the Department name.");
                return false;
            }
        }
    ])
        .then(departmentData => {
            const department = new Department(departmentData.title);
            addDepartment(department);
            console.log("Created Department");
        });
};

const promptRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: "Please enter the Role name. (Required)",
            validate: roleTitleInput => {
                if (roleTitleInput) {
                    return true;
                } else console.log("Please enter the Role name.");
                return false;
            }
        },
        {
            type: 'number',
            name: 'salary',
            message: "Please enter the Role's salary. (Must be a number)",
            validate: roleSalaryInput => {
                if (roleSalaryInput) {
                    return true;
                } else console.log("Please enter a number for the Salary.");
                return false;
            }
        }
    ])
        .then(roleData => {

            const sql = `Select departments.id AS value, departments.title AS name FROM departments`;
            connection.query(sql, (err, result) => {
                if (err) throw err;
                const departmentArray = result;

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Which department does this role belong to?',
                        choices: departmentArray
                    }
                ])
                    .then(results => {
                        const role = new Role(roleData.title, roleData.salary, results.department);
                        addRole(role);
                        console.log("Created Role");
                    });
            });
        });
};

const promptEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Please enter the Employee's first name. (Required)",
            validate: firstNameInput => {
                if (firstNameInput) {
                    return true;
                } else console.log("Please enter the first name.");
                return false;
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Please enter the Employee's last name. (Required)",
            validate: lastNameInput => {
                if (lastNameInput) {
                    return true;
                } else console.log("Please enter the last name.");
                return false;
            }
        }
    ])
        .then(nameData => {
            const sql = `Select roles.id AS value, roles.title AS name FROM roles`;
            connection.query(sql, (err, result) => {
                if (err) throw err;
                const roleArray = result;

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role_id',
                        message: "Please select the role for the new employee.",
                        choices: roleArray
                    }
                ])
                    .then(roleData => {
                        const sql = `Select employees.id AS value, CONCAT(employees.first_name, ' ', employees.last_name) AS name FROM employees`;
                        connection.query(sql, (err, result) => {
                            if (err) throw err;
                            const empArray = result;

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'emp_id',
                                    message: "Please select the manager for the new employee.",
                                    choices: empArray
                                }
                            ])
                                .then(results => {
                                    const employee = new Employee(nameData.first_name, nameData.last_name, roleData.role_id, results.emp_id);
                                    addEmployee(employee);
                                    console.log("Created Employee");
                                });
                        });
                    });
            });
        });
};

const promptUpdate = () => {
    const sql = `Select employees.id AS value, CONCAT(employees.first_name, ' ', employees.last_name) AS name FROM employees`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        const empArray = result;

        const sql2 = `Select roles.id AS value, roles.title AS name FROM roles`;
        connection.query(sql2, (err, result) => {
            if (err) throw err;
            const roleArray = result;


            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeID',
                    message: "Please select the employee who's role you'd like to update.",
                    choices: empArray
                },
                {
                    type: 'list',
                    name: 'roleID',
                    message: "Please select the new role for the employee.",
                    choices: roleArray
                }
            ])
                .then(updateData => {
                    const update = new Update(updateData.employeeID, updateData.roleID);
                    updateRole(update);
                    console.log("Updated Role");
                });
        });
    });
};

const promptConfirm = () => {
    inquirer.prompt([
        {
            type: 'confirm',
                    name: 'confirmDoMore',
                    message: "Would you like to do anything else?",
                    default: false
        }
    ])
        .then(answer => {
            if (answer.confirmDoMore) {
                return promptUser();
            } else {
                return console.log("Thank you for using the Employee Tracker 9000");
            }
        });
};

promptUser()

module.exports.promptConfirm = promptConfirm;