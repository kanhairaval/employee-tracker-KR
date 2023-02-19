const inquirerMod = require("inquirer");
const db = require("db");

const mainQuestion = 
  {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Exit"]
  };



function generateQuestions () {
  inquirerMod.prompt(mainQuestion)
  .then(function (data) {
    switch (data.action) {
      case "View all departments":
        db.query(`SELECT * FROM departments`, function (err, results) {
          console.log(results);
        });
        break;
    }
  })
}

generateQuestions();

module.exports = generateQuestions;