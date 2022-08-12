const inquirer = require('inquirer');

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
        }
    ])
}

promptUser()