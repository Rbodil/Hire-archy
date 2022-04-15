const connection = require('./connection');

class db{
    //add or create new dept
    createDept(deptName) {
        return this.connection.promise().query('INSERT INTO department SET ?', deptName);
    };
    createRole(role){
        return this.connection.promise().query('INSERT INTO roles SET ?', role);
    };
    createEmployee(employee){
        return this.connection.promise.query('INSERT INTO employee SET ?', employee);
    };
    viewEmployees(){
        return this.connection.promise.query('SELECT * FROM employee');
    };
    viewRoles(){
        return this.connection.promise.query('SELECT * FROM role');
    };
    viewDepartments(){
        return this.connection.promise.query('SELECT * FROM department');
    };
    findEmployees(){
        return this.connection.promise.query('SELECT first_name, last_name, role.name AS role_name FROM employee LEFT JOIN role ON employee.role_id = role.name');
    }

}

module.exports = new db(connection);