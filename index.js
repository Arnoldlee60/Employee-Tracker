const mysql = require('mysql');
const inquirer = require('inquirer');
const fs = require('fs');
var counter = 1;
//const generateMarkdown = require('./utils/generateMarkdown.js')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'work_db',
  });

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
            "Update manager role",
            "Nothing"
        ],
    }
];
const empName = [
    {
        type: "input",
        name: "fname",
        message: "What is the employee's first name?",
    },
    {
        type: "input",
        name: "lname",
        message: "What is the employee's last name?",
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
        type: "input",
        name: "manager",
        message: "Who is the employee's manager?", 
        //choices: ['a', 'b', 'c']//same as employeelist except with 'none'
    }
];

removePrompt = [ //Remove employee option
    {
        type: "input",
        name: "fnameR",
        message: "What is the first name of the employee that you wish to remove?",
    },
    {
        type: "input",
        name: "lnameR",
        message: "What is the last name of the employee that you wish to remove?",
    }
]

const changeM = [ //Remove employee option
    {
        type: "input",
        name: "newManager",
        message: "Who is the new manager you want to assign this employee?",
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
const changeR = [
    
        {
            type: "input",
            name: "newRole",
            message: "What is the new role you want to assign this employee?",
        }
]
const viewDep = [
    {
        type: "list",
        name: "departmentView",
        message: "What department would you like to see?", 
        choices: ['Sales', 'Engineering', 'Finance', 'Legal']//same as employeelist except with 'none'
    }
];
const viewMan = [
    {
        type: "input",
        name: "managerView",
        message: "What manager's employees would you like to see'?"
        //choices: ['Sales', 'Engineering', 'Finance', 'Legal']//same as employeelist except with 'none'
    }
]
function main() {
    inquirer.prompt(mainQuestion)
    .then(function (userInput) {
        if(userInput.main == "View all employees"){
            connection.query("SELECT * FROM employees", function (err, result, fields) {
              console.table(result);
              main(); //reset and do again
            });
            
        }
        
        else if(userInput.main == "View all employees by department"){
            //do the same as all employees but thru select xxx from employees
            inquirer.prompt(viewDep)
            .then(function (userInput) {
                connection.query(`SELECT * FROM employees WHERE department = "${userInput.departmentView}"`, function (err, result, fields) {
                console.table(result);
                main()
            });
            })
        }
        else if(userInput.main == "View all employees by manager"){
            //same
            inquirer.prompt(viewMan)
            .then(function (userInput) {
                connection.query(`SELECT * FROM employees WHERE manager = "${userInput.managerView}"`, function (err, result, fields) {
                console.table(result);
                main()
            });
            })
        }
        else if(userInput.main == "Add employee"){

            var temp = [];
            temp = empName.concat(addPrompt);
            //console.log(temp);
            inquirer.prompt(temp)
            .then(function (userInput) {
                var sql = `INSERT INTO employees (fname, lname, title, department, salary, manager) VALUES ( '${userInput.fname}', '${userInput.lname}', '${userInput.role}', '${userInput.department}', '${userInput.salary}', '${userInput.manager}' )`;
                //console.log(userInput)
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
        else if(userInput.main == "Remove employee"){ //you have to disable safe mode on sql with edit -> preferences
            //var temp = [];
            //temp = empName.concat(removePrompt);
            inquirer.prompt(removePrompt)
            .then(function (userInput) {
            connection.query(`SELECT fname, lname FROM employees;`, function (err, result, fields) {
                //console.log(result)
                //console.log(result[0].fname)
                //console.log(userInput.fname)
                for(var i = 0; i < result.length; i ++)
                {
                //console.log(result[i].fname)
                if(result[i].fname == userInput.fnameR && result[i].lname == userInput.lnameR)
                    {
                        var sql = `DELETE FROM employees WHERE fname = '${userInput.fnameR}';`
                        //console.log(userInput)
                        connection.query(sql);
                    }
                }

              });
            })
            .then(function () {
                inquirer.prompt(again) //do again
                .then(function (userInput) {
                //console.log(userInput.again)
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
        else if(userInput.main == "Update employee role"){
            var temp = [];
            temp = empName.concat(changeR);
            inquirer.prompt(temp)
            .then(function (userInput) {
                connection.query(`SELECT fname, lname FROM employees;`, function (err, result, fields) {

                    for(var i = 0; i < result.length; i ++)
                {
                //console.log(result[i].fname)
                if(result[i].fname == userInput.fname && result[i].lname == userInput.lname)
                    {

                var sql = `UPDATE employees
                           SET title = '${userInput.newRole}'
                           WHERE fname = '${userInput.fname}';`
                 console.log(userInput)
                connection.query(sql);
            }}
            })
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
        else if (userInput.main == "Update manager role")
        {   //Update manager role
            var temp = [];
            temp = empName.concat(changeM);
            inquirer.prompt(temp)
            .then(function (userInput) {
                connection.query(`SELECT fname, lname FROM employees;`, function (err, result, fields) {

                    for(var i = 0; i < result.length; i ++)
                {
                //console.log(result[i].fname)
                if(result[i].fname == userInput.fname && result[i].lname == userInput.lname)
                    {

                var sql = `UPDATE employees
                           SET manager = '${userInput.newManager}'
                           WHERE fname = '${userInput.fname}';`
                 //console.log(userInput)
                connection.query(sql);
            }}
            })
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
        else
        {
            console.log("Finished")
        }
    });

};



//start table up at the beginning so that there is no error when you something other than view table first
connection.query("SELECT * FROM employees", function (err, result, fields) {
    console.table(result);
    main(); //reset and do again
  });



/*old code

if(counter == 0)
        {
        connection.connect(function(err) {
            if (err) throw err;
            connection.query("SELECT * FROM employees", function (err, result, fields) {
              if (err) throw err;
              console.table(result);
              main(); //reset and do again
            });
          });
          counter++;
        }
        */


