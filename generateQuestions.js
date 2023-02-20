const inquirerMod = require("inquirer");
const mysql = require('mysql2');
const table = require("console.table");

const db = mysql.createConnection (
  {
    host: `localhost`,
    user: `root`,
    password: `supersecretpassword`,
    database: `employees_db`
  }, console.log(`Connected to the employees_db database.`)
);

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
          console.log("\n");
          console.table(results);
        });
        break;
      case "View all roles":
        db.query(`SELECT
        roles.role_id AS id,
        roles.job_title AS title,
        roles.role_salary AS salary,
        departments.department_name AS department
        FROM roles
        JOIN departments ON roles.dep_id = departments.id;`,
        function (err, results) {
        console.log("\n");
        console.table(results);
      });
      case "View all employees":
        db.query(`SELECT
        employees.employee_id AS id,
        employees.first_name AS first_name,
        employees.last_name AS last_name,
        roles.job_title AS title,
        departments.department_name AS department,
        roles.role_salary AS salary,
        CONCAT(manager.first_name, " ", manager.last_name) AS manager
        FROM employees
        JOIN departments ON roles.dep_id = departments.id,
        JOIN employees ON employees.manager_id = employees.employee_id
        GROUP BY frist_name, last_name;`,
        function (err, results) {
        console.log("\n");
        console.table(results);
      });
    }
  });
}

generateQuestions(db);

module.exports = generateQuestions;