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
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Delete a department", "Delete a role", "Delete an employee", "Exit"]
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
    name: "department",
    message: "What department does this role belong to?",
    choices: function() {
      return new Promise(function(resolve, reject) {
        db.query(`SELECT id, department_name FROM departments`, function(err, results) {
          if (err) reject(err);
          resolve(results.map(result => ({name: result.department_name, value: result.id})));
        });
      });
    }
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary for this role?"
  }];

const employeeQuestions =
  [{
    type: "input",
    name: "firstName",
    message: "What is the first name of the employee, you are trying to add?"
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the last name of the employee, you are trying to add?"
  },
  {
    type: "list",
    name: "role",
    message: "What is the role of the employee?",
    choices: function() {
      return new Promise(function(resolve, reject) {
        db.query(`SELECT role_id, job_title FROM roles`, function(err, results) {
          if (err) reject(err);
          resolve(results.map(result => ({name: result.job_title, value: result.role_id})));
        });
      });
    }
  },
  {
    type: "list",
    name: "repManager",
    message: "Who is the employee's manager?",
    choices: function() {
      return new Promise(function(resolve, reject) {
        db.query(`SELECT manager_id, employee_id, first_name, last_name FROM employees`, function(err, results) {
          if (err) reject(err);
          resolve(results.map(result => ({name: result.manager_id ? `${result.first_name} ${result.last_name}` : "None", value: result.employee_id})));
        });
      });
    }
  }]

  const updateEmployee =
  [{
    type: "list",
    name: "newRole",
    message: "Which employee's role would you like to update?",
    choices: function() {
      return new Promise(function(resolve, reject) {
        db.query(`SELECT first_name, last_name, employee_id FROM employees`, function(err, results) {
          if(err) reject(err);
          resolve(results.map(result => ({name: `${result.first_name} ${result.last_name}`, value: result.employee_id})))
        });
      });
    }
  },
   {
    type: "list",
    name: "roleType",
    message: "Which role do you want to assign to the selected employee?",
    choices: function() {
      return new Promise(function(resolve, reject) {
        db.query(`SELECT job_title, role_id FROM roles`, function(err, results) {
          if(err) reject(err);
          resolve(results.map(result => ({name: result.job_title, value: result.role_id})))
        });
      });
    }
   },
   {
    type: "list",
    name: "newManager",
    message: "Who is the employee's new manager?",
    choices: function() {
      return new Promise(function(resolve, reject) {
        db.query(`SELECT manager_id, employee_id, first_name, last_name FROM employees`, function(err, results) {
          if (err) reject(err);
          resolve(results.map(result => ({name: result.manager_id ? `${result.first_name} ${result.last_name}` : "None", value: result.employee_id})));
        });
      });
    }
  }]

function generateQuestions () {
  inquirerMod.prompt(mainQuestion, departmentQuestion)
  .then(function (data) {
    switch (data.action) {
      case "View all departments":
        db.query(`SELECT * FROM departments`, function (err, results) {
          console.log("\n");
          console.table(results);
          generateQuestions();
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
        generateQuestions();
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
        generateQuestions();
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
            generateQuestions();
          })
        });
         break;
         case "Add a role":
          inquirerMod.prompt(roleQuestions)
          .then(function (data) {
            db.query(`INSERT INTO roles (job_title, dep_id, role_salary)
          VALUES (?,?,?);`, [data.role, data.department, data.salary],
          function (err, results) {
            console.log("\n");
            console.table(`${data.role} role has been added to the roles table.`);
            generateQuestions();
          })
          });
          break;
          case "Add an employee":
          inquirerMod.prompt(employeeQuestions)
          .then(function (data) {
          db.query(`INSERT INTO employees (first_name, last_name, id_role, manager_id)
          VALUES (?, ?, ?, ?)`,
          [data.firstName, data.lastName, data.role, data.repManager],
          function (err, results) {
            console.log("\n");
            console.table(`${data.firstName} ${data.lastName} ${data.role} ${data.repManager} has been added to the employees table.`);
            generateQuestions();
          })
          });
          break;
          case "Update an employee role":
            inquirerMod.prompt(updateEmployee)
            .then(function (data) {
              console.log(data.newManager);
            db.query(`UPDATE employees SET id_role = ?, manager_id = ? WHERE employee_id = ?`,
            [data.roleType, data.newManager, data.newRole],
            function (err, results) {
              console.log("\n");
              console.table(`Selected employee's role has been updated.`);
              generateQuestions();
            })
            });
    }
  });
}

generateQuestions(db);

module.exports = generateQuestions;