var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'espacio_libre_covid19'
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