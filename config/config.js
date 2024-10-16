const mysql = require("mysql2");
const fs = require("fs");

//const sql = fs.readFileSync('./database/sql.sql', 'utf8');

const pool = mysql.createPool({
  host: "sql8.freesqldatabase.com",
  port: 3306,
  user: "sql8737298",
  password: "AK4cqcNvxm",
  database: "sql8737298",
  multipleStatements: true,
});





module.exports = pool.promise();
