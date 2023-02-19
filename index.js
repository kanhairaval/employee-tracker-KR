const mysql = require('mysql2');

const db = mysql.createConnection (
  {
    host: `localhost`,
    user: `root`,
    password: `supersecretpassword`,
    database: `employees_db`
  }, console.log(`Connected to the employees_db database.`)
);

console.log(`********************************************`);
console.log(`   *                                    *   `);
console.log(`   *                                    *   `);
console.log(`   *             Employee               *   `);
console.log(`   *             Manager                *   `);
console.log(`   *                                    *   `);
console.log(`   *                                    *   `);
console.log(`********************************************`);

const questions = require(`./generateQuestions`);

module.exports = db;

questions(db);