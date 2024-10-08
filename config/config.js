const mysql = require('mysql2');
const fs = require('fs');


//const sql = fs.readFileSync('./database/sql.sql', 'utf8');


const pool = mysql.createPool({
   host : 'localhost',
   port : 3306,
   user : 'tvhevents',
   password : 'alpb^NPL6]Tj_bIc',
   database: 'tvhevents',
   multipleStatements: true, 
});

/*
pool.query(sql, (err, results) => {
    if(err){
        console.log(err)
    }
    else{
        console.log('Database initialized!');
    }
    
});
*/

module.exports = pool.promise();









