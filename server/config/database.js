var mysql      = require('mysql');
//Local
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'espacio_libre_covid19'
// });
var connection = mysql.createConnection({
    host     : 'tfg.cl1ipfrnwi7j.us-east-2.rds.amazonaws.com',
    user     : 'root',
    password : 'rootroot',
    database : 'espacio_libre_covid19',
    port: 3306
  });
 
connection.connect(function (err){
    if(err){
        console.log('Error connection');
        return;
    } else{
        console.log('Success connection');
    }
});

module.exports = connection;