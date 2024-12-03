const mysql = require("mysql2");
const fs = require("fs");

//const sql = fs.readFileSync('./database/sql.sql', 'utf8');

const pool = mysql.createPool({
  host: "sql.freedb.tech",
  port: 3306,
  user: "freedb_sql8741451",
  password: "KHeD84a6?S!hyWq",
  database: "freedb_sql8741451",
  multipleStatements: true,
});





module.exports = pool.promise();
