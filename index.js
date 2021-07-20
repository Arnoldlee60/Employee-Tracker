const inquirer = require('inquirer');
const fs = require('fs');
//const generateMarkdown = require('./utils/generateMarkdown.js')

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
    },
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
];

function init() {
    inquirer.prompt(mainQuestion)
    .then(function (userInput) {
        console.log(userInput)

    });
};

// Function call to initialize app
init();




