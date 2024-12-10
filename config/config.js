const mysql = require("mysql2");
const fs = require("fs");

//const sql = fs.readFileSync('./database/sql.sql', 'utf8');

const pool = mysql.createPool({
  host: "sql8.freesqldatabase.com",
  port: 3306,
  user: "sql8751076",
  password: "m34W92skw7",
  database: "sql8751076",
  multipleStatements: true,
});





module.exports = pool.promise();
