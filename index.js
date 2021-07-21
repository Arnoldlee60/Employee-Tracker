const mysql = require('mysql');
const inquirer = require('inquirer');
const fs = require('fs');
//const generateMarkdown = require('./utils/generateMarkdown.js')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'work_db',
  });

const employeeList = ['dog', 'cat'];

const mainQuestion = [
    {
        type: "list",
        name: "main",
        message: "What would you like to do?", 
        choices: [
            "View all employees",
            "View all employees by department",
            "View all employees by manager",
            "Add employee",
            "Remove employee",
            "Update employee role",
            "Update manager role"
        ],
    }
];
const empName = [
    {
        type: "input",
        name: "lname",
        message: "What is the employee's last name?",
    },
    {
        type: "input",
        name: "fname",
        message: "What is the employee's first name?",
    }
]

const addPrompt = [ //add employee option
    {
        type: "list",
        name: "role",
        message: "What is their role?",
        choices: [
            'Sales lead',
            'Salesperson',
            'Lead Engineer',
            'Software Engineer',
            'Account Manager',
            'Accountant',
            'Legal Team Lead'
        ]
    },
    {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?", 
        choices: []//same as employeelist except with 'none'
    }
];

const removePrompt = [ //Remove employee option
    {
        type: "list",
        name: "remove",
        message: "Who would you like to remove?", 
        choices: employeeList
        //push mysql stuff into array then make that the choices or somehow mysql directly
    }
];

const changeM = [ //Remove employee option
    {
        type: "list",
        name: "changeManager",
        message: "What employee's manager would you like to change?",
        choices: employeeList
    },
    {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?", 
        choices: []//same as employeelist except with 'none'
    }
];

function main() {
    inquirer.prompt(mainQuestion)
    .then(function (userInput) {
        if(userInput.main == "View all employees"){

        connection.connect(function(err) {
            if (err) throw err;
            connection.query("SELECT * FROM employees", function (err, result, fields) {
              if (err) throw err;
              console.table(result);
            });
          });

        }
        else if(userInput.main == "View all employees by department"){
            

        }
        else if(userInput.main == "View all employees by manager"){
            
        }
        else if(userInput.main == "Add employee"){
            inquirer.prompt(empName)
            .then(function (userInput) {
               // inquirer.prompt(addPrompt)
            })
            .then(function (userInput) {
                console.log('it worked')
                //function to remove use the thing where you use a mysql function here to add

                    var sql = `INSERT INTO employees (fname, lname) VALUES ( "x", "xx" )`;
                    connection.query(sql);
                    //connection.end();
            });
        }
        else if(userInput.main == "Remove employee"){
            inquirer.prompt(removePrompt)
            .then(function (userInput) {
                console.log('it worked')
                //function to remove use the thing where you use a mysql function here to remove
            });
        }
        else if(userInput.main == "Update employee role"){
            
        }
        else{
        //Update manager role
        inquirer.prompt(changeM)
        .then(function (userInput) {
            console.log('it worked')
            //function to remove use the thing where you use a mysql function here to remove
        });
        }

    });

};

// Function call to initialize app
main();




