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
        name: "department",
        message: "Where is the employee's department?", 
        choices: ['Sales', 'Engineering', 'Finance', 'Legal']//same as employeelist except with 'none'
    },
    {
        type: "input",
        name: "salary",
        message: "How much does the employee make?"
    },
    {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?", 
        choices: ['a', 'b', 'c']//same as employeelist except with 'none'
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
const again = [
    {
        type: "list",
        name: "again",
        message: "Continue?",
        choices: ['Yes', 'No']
    }
]

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

            var temp = [];
            temp = empName.concat(addPrompt);
            //console.log(temp);
            inquirer.prompt(temp)
            .then(function (userInput) {
                var sql = `INSERT INTO employees (fname, lname, title, department, salary, manager) VALUES ( '${userInput.fname}', '${userInput.lname}', '${userInput.role}', '${userInput.department}', '${userInput.salary}', '${userInput.manager}' )`;
                console.log(userInput)
                connection.query(sql);
            })
            .then(function () {
                inquirer.prompt(again) //do again
                .then(function (userInput) {
                console.log(userInput.again)
                if(userInput.again == 'Yes')
                {
                main();
                }
                    else{
                        console.log("Finished")
                    }
                })
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




