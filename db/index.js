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
    }

}

module.exports = new db(connection);