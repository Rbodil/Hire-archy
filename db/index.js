const connection = require('./connection');

class db {
    constructor(connection) {
        this.connection = connection;

    }
    //A promise is an IOU for data, it's asynchrounus, waits for .then code statements
    createDept(answer) {
        return this.connection.promise().query('INSERT INTO department (title) VALUES (?)', answer);
    };
    createRole(role) {
        return this.connection.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [role.title, role.salary, role.department_id]);
    };
    createEmployee(employee) {
        return this.connection.promise().query('INSERT INTO employee SET ?', employee);
    };
    viewEmployees() {
        return this.connection.promise().query(
            `SELECT 
            employee.id,
            employee.first_name,
            employee.last_name,
            role.title AS role_name,
            department.title AS department_title,
            role.salary AS salary,
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
            FROM employee 
            LEFT JOIN 
            role ON employee.role_id = role.id 
            LEFT JOIN 
            employee manager ON employee.manager_id = manager.id 
            LEFT JOIN 
            department ON role.department_id = department.id`);
    };
    viewRoles() {
        return this.connection.promise().query(
            `SELECT 
            role.id, role.title, role.salary,
            department.title AS department
            FROM role 
            LEFT JOIN department 
            ON role.department_id = department.id`);
    };
    viewDepartments() {
        return this.connection.promise().query('SELECT * FROM department');
    };
    findEmployees() {
        return this.connection.promise().query('SELECT first_name, last_name, role.title AS role_name FROM employee LEFT JOIN role ON employee.role_id = role.id');
    };
    updateRole(roleId, employeeId) {
        return this.connection.promise().query('UPDATE employee SET role_id = ? WHERE employee.id = ?', [roleId, employeeId]);
    };



}


module.exports = new db(connection);