const mysql = require("mysql2");
const fs = require("fs");

//const sql = fs.readFileSync('./database/sql.sql', 'utf8');

const pool = mysql.createPool({
  host: "sql8.freesqldatabase.com",
  port: 3306,
  user: "sql8741451",
  password: "r9BjLb1q8P",
  database: "sql8741451",
  multipleStatements: true,
});





module.exports = pool.promise();
