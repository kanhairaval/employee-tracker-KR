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

const departmentQuestion =
  {
    type: "input",
    name: "department",
    message: "What is the name of the department you would like to add?"
  }

const roleQuestions =
  [{
    type: "input",
    name: "role",
    message: "What is the name of the role you would like to add?"
  },
  {
    type: "list",
    name: "depList",
    message: "What department does this role belong to?",
    choices: function () {
      return new Promise(function(resolve, reject) {
        db.query(`SELECT * FROM departments`,
        function (err,results) {
          console.log("\n");
          console.table(results);
        })
      })
    }
  }]

// const secondRoleQuestion =
//   {
//     type: "list",
//     name: "depList",
//     message: "What department does this role belong to?",
//     choices: db.query(`SELECT * FROM departments`, function (err, results) {
//       console.log("\n");
//       console.table(results);
//     })
//   }

function generateQuestions () {
  inquirerMod.prompt(mainQuestion, departmentQuestion)
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
        break
      case "View all employees":
        db.query(`SELECT 
        employees.employee_id AS id, 
        employees.first_name, 
        employees.last_name, 
        roles.job_title AS title, 
        departments.department_name AS department, 
        roles.role_salary AS salary, 
        CONCAT(managers.first_name, ' ', managers.last_name) AS manager 
        FROM 
        employees 
        JOIN roles ON employees.id_role = roles.role_id 
        JOIN departments ON roles.dep_id = departments.id 
        LEFT JOIN employees AS managers ON employees.manager_id = managers.employee_id 
        GROUP BY 
        employees.employee_id;`,
        function (err, results) {
        console.log("\n");
        console.table(results);
      });
        break
      case "Add a department":
        inquirerMod.prompt(departmentQuestion)
        .then(function (data) {
          db.query(`INSERT INTO departments (department_name)
          VALUES (?);`, data.department,
          function (err, results) {
            console.log("\n");
            console.table(`${data.department} department has been added to the departments table.`);
          })
        });
         break;
         case "Add a role":
          inquirerMod.prompt(roleQuestions)
          .then(function (data) {
            db.query(`INSERT INTO roles (job_title)
          VALUES (?);`, data.role,
          function (err, results) {
            console.log("\n");
            console.table(`${data.role} role has been added to the roles table.`);
          })

          });
          break;
    }
  });
}

generateQuestions(db);

module.exports = generateQuestions;