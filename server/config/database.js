var mysql      = require('mysql');
//Local
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'tfg_database'
// });

//Prod
var connection = mysql.createConnection({
    host     : 'tfg.cxx0lf4ek1mi.us-east-2.rds.amazonaws.com',
    user     : 'root',
    password : 'rootroot',
    database : 'tfg_database',
    port: 3306
  });
 
connection.connect(function (err){
    if(err){
        console.log('Error connection');
        console.log(err);
        return;
    } else{
        console.log('Success connection');
    }
});

module.exports = connection;