const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./db/index');

function portal() {


    inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "list",
            name: "addOptions",
            choices: [
                'Add Department', 'Add Role',
                'Add Employee', 'Update Employee Role', 
                'View Employees','View Roles', 
                'View Departments'
            ]
        }
    ]).then((userChoice) => {

        switch (userChoice.addOptions) {
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployee();
                break;
            case 'View Employees':
                viewEmployees();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Departments':
                viewDepartments();

        }
    })
}

function addDepartment() {

    inquirer.prompt([
        {
            message: "What is the name of the department?",
            type: "input",
            name: "title"
        }
    ]).then(answer => {
        //runs createDept and logs whether any data was changed in the database
        db.createDept(answer.title).then(data => {
            if (data[0].affectedRows > 0) {
                console.log('Department created!');
                return portal();
            }
            console.log('Unable to create department');
            portal();
        })
    });

}

function addRole() {
    // destructures data returned from the query, finds specifically the 
    db.viewDepartments().then(([departments]) => {
        return departments.map(department => {
            return {
                name: department.title,
                value: department.id
            }
        })
    }).then(departments => {

        inquirer.prompt([
            {
                message: "What is the name of the role?",
                type: 'input',
                name: "title"
            },
            {
                message: 'What is the salary of this role?',
                type: 'number',
                name: 'salary'
            },
            {
                message: 'What department does this belong to (department id)?',
                type: 'list',
                name: 'department_id',
                choices: departments
            }
        ]).then(answers => {
            db.createRole(answers).then(data => {
                if (data[0].affectedRows > 0) {
                    console.log('Role created!');
                    return portal();
                }
                console.log('Unable to create role');
                portal();
            })
        })
    })



}

function addEmployee() {

    db.viewEmployees().then(([employees]) => {
        return employees.map(employee => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }
        })
    }).then(employees => {
        db.viewRoles().then(([roles]) => {
            return roles.map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
            })
        }).then(roles => {
            inquirer.prompt([
                {
                    message: 'What is their first name?',
                    type: 'input',
                    name: 'first_name'
                },
                {
                    message: 'What is their last name?',
                    type: 'input',
                    name: 'last_name'
                },
                {
                    message: 'What is their role?',
                    type: 'list',
                    name: 'role_id',
                    choices: roles

                },
                {
                    message: "What is this employee's manager's id?",
                    type: 'list',
                    name: 'manager_id',
                    choices: employees
                }
            ]).then(answers => {
                db.createEmployee(answers).then(data => {
                    if (data[0].affectedRows > 0) {
                        console.log('Employee created!');
                        return portal();
                    }
                    console.log('Unable to create employee');
                    portal();
                })
            })
        })
    })
    
}

function updateEmployee() {

    db.viewEmployees().then(([employees]) => {
        return employees.map(employee => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }
        })
    }).then(employees => {
        db.viewRoles().then(([roles]) => {
            return roles.map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
            })
        }).then(roles => {
            inquirer.prompt([
                {
                    message: 'Which employee needs to be updated?',
                    type: 'list',
                    name: "updateEmp",
                    choices: employees

                },
                {
                    message: 'What is their new role?',
                    type: 'list',
                    name: "updateRole",
                    choices: roles
                }
            ]).then(userChoice => {
                db.updateRole(userChoice.updateRole, userChoice.updateEmp).then(data => {
                    if (data[0].affectedRows > 0) {
                        console.log('Employee updated');
                        return portal();
                    }
                    console.log('Unable to update employee');
                    portal();
                })
            })
        })
    })



}

function viewEmployees() {
    db.viewEmployees().then(([employees]) => console.table(employees)).then(() => portal());
}

function viewRoles() {
    db.viewRoles().then(([roles]) => console.table(roles)).then(() => portal());
}

function viewDepartments(){
    db.viewDepartments().then(([departments]) => console.table(departments)).then(() => portal());
}


portal();