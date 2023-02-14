const mysql = require('mysql2');
const questions = require(`./generateQuestions`);

const db = mysql.createConnection (
  {
    host: `localhost`,
    user: `root`,
    password: ``,
    database: `employees_db`
  }, console.log(`Connected to the employees_db database.`)
);

console.log(`**************************************`)