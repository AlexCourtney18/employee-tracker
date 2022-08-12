const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees } = require('./commands');

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
            }
        })
        .then(promptUser);
}

promptUser()