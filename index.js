const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole } = require('./commands');
const Department = require('./lib/Department');
const Role = require('./lib/Role');

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
        },
        {
            type: 'confirm',
            name: 'confirmDoMore',
            message: "Would you like to do anything else?",
            default: false
        }
    ])
        .then(departmentData => {
            const department = new Department(departmentData.title);
            addDepartment(department);
            console.log("Created Department");
            console.log(department);
            if (departmentData.confirmDoMore) {
                return promptUser();
            } else {
                return console.log("Thank you for using the Employee Tracker 9000");
            }
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
        },
        {
            type: 'number',
            name: 'department_id',
            message: "Please enter the department ID for this role if known",
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmDoMore',
            message: "Would you like to do anything else?",
            default: false
        }
    ])
        .then(roleData => {
            const role = new Role(roleData.title, roleData.salary, roleData.department_id);
            addRole(role);
            console.log("Created Role");
            console.log(role);
            if (roleData.confirmDoMore) {
                return promptUser();
            } else {
                return console.log("Thank you for using the Employee Tracker 9000");
            }
        });
}

promptUser()

// module.exports = { promptUser };