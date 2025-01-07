const mysql = require("mysql2");
const fs = require("fs");

//const sql = fs.readFileSync('./database/sql.sql', 'utf8');

const pool = mysql.createPool({
  host: "102.222.124.20",
  port: 3306,
  user: "a7stacr7f7n5_tvhadmin",
  password: "FbsoA^KT2n5d",
  database: "a7stacr7f7n5_tvhevents",
  multipleStatements: true,
});





module.exports = pool.promise();
