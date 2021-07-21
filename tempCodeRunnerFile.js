function main() {
    inquirer.prompt(mainQuestion)
    .then(function (userInput) {
        if(userInput.main == "View all employees"){
        //console.log(userInput)
        //function for view all employee
 
        }
        else if(userInput.main == "View all employees by department"){

        }
        else if(userInput.main == "View all employees by manager"){
            
        }
        else if(userInput.main == "Add employee"){
            inquirer.prompt(addPrompt)
            .then(function (userInput) {
                console.log('it worked')
                //function to remove use the thing where you use a mysql function here to add
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