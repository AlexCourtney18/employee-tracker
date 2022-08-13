const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees, addDepartment } = require('./commands');
const Department = require('./lib/Department');

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
            }
            })
        //.then(promptUser);
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

promptUser()

// module.exports = { promptUser };