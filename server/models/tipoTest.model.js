const connection = require('../config/database');

var TipoTest = function(tipoTest){
    this.nombre = tipoTest.nombre;
};

TipoTest.create = function (tipoTest, result) {   
    const sql = 'INSERT INTO tipos_test SET ?';
    
    connection.query(sql, tipoTest, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

TipoTest.findById = function (id, result) {
    const sql = 'SELECT * FROM tipos_test WHERE id_tipo =?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

TipoTest.findAll = function (result) {
    const sql = 'SELECT * FROM tipos_test';
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

module.exports = TipoTest;