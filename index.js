const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./db/index');
const { findAllEmployees } = require('./db/index');

function portal() {

    // print tables?

    inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "list",
            name: "addOptions",
            choices: ['Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Nothing']
        }
    ]).then(({ userChoice }) => {

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
            case 'Nothing':
                generateTables();
        }
    })
}

// 'Add Department', 'Add Role', 'Add Employee', 'Update Employee' generateTables

function addDepartment(){

    inquirer.prompt([
        {
            message: "What is the name of the department?",
            type: "input",
            name: "deptName"
        }
    ]).then(answer =>{
        const newDept = new Department(answer);
        //push newDept to tables data
        db.createDept(newDept);
        portal();
    });

}

function addRole(){
    inquirer.prompt([
        {
            message: "What is the name of the role?",
            type: 'input',
            name: "roleName"
        },
        {
            message: 'What is the salary of this role?',
            type: 'input',
            name: 'roleSalary'
        },
        {
            message: 'What department does this department belong to?',
            type: 'input',
            name: 'roleDept'
        }
    ]).then(answers =>{
        const newRole = new Role(answers.roleName, answers.roleSalary, answers.roleDept);
        //push newRole to tables data
        db.createRole(newRole);
        portal();
    })

}

function addEmployee(){
    inquirer.prompt([
        {
            message: 'What is their first name?',
            type: 'input',
            name: 'firstName'
        },
        {
            message: 'What is their last name?',
            type: 'input',
            name: 'lastName'
        },
        {
            message: 'What is their role?',
            type: 'input',
            name: 'empRole'
            
        },
        {
            message: "Who is this employee's manager?",
            type: 'input',
            name: 'manager'
        }
    ]).then(answers =>{
        const newEmployee = new Employee(answers.firstName, answers.lastName, answers.empRole, answers.manager);
        db.createEmployee(newEmployee);
        portal();
    })
}

function updateEmployee(){

    const employees = findEmployee();

    inquirer.prompt([
        {
            message: 'Which employee needs to be updated?',
            type: 'input',
            name:"updateEmp",
            choices: [employees.first_name]
            // find how to pull the data and list it
        },
        {
            message:'What is their new role?',
            type:'input',
            name: "updateRole",
            choices:''
            // find and list employees
        }
    ]).then(userChoice =>{
        // push the updated info to tables
        const changes = 
        db.changeEmployee(changes)
    })

}

function generateTables(){
    // print tables to console

}

portal();