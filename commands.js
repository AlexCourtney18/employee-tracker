const mysql = require('mysql2');
const cTable = require('console.table');
// const { promptUser } = require('./index');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password',
    database: 'company'
});

const viewDepartments = () => {
    connection.execute(
        `SELECT * FROM departments;`,
        function(err, results) {
            const table = cTable.getTable(results);
            console.log(table);
        }
        );
};

const viewRoles = () => {
    connection.execute(
    `SELECT * FROM roles;`,
    function(err, results) {
        const table = cTable.getTable(results);
        console.log(table);
    }
    );
};

const viewEmployees = () => {
    connection.execute(
    `SELECT * FROM employees;`,
    function(err, results) {
        const table = cTable.getTable(results);
        console.log(table);
    }
    );
};

const addDepartment = () => {

}



module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees
}