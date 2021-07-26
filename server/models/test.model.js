const connection = require('../config/database');

//Test 
var Test = function(test){
    this.id_empleado           = test.id_empleado;
    this.id_tipo               = test.id_tipo;
    this.resultado             = test.resultado;
    this.clinica               = test.clinica;
    this.fecha_test            = test.fecha_test;
};

Test.findAll = function (result) {
    const sql = 'SELECT * FROM tests';
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

Test.findById = function (id, result) {
    const sql = 'SELECT * FROM tests WHERE id_test =?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Test.findByIdEmpleado = function (id, result) {
    const sql = 'SELECT tests.*, tipos_test.nombre FROM tests  INNER JOIN tipos_test on tipos_test.id_tipo = tests.id_tipo WHERE id_empleado =?';
    connection.query(sql, id, function (err, res) {            
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Test.create = function (test, result) {   
    const sql = 'INSERT INTO tests SET ?';
    
    connection.query(sql, test, function (err, res) {
        if(err) {
            console.log(err);
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });           
};

Test.update = function(id, test, result){
    const sql = 'UPDATE tests SET ? WHERE id_test = ?';
    connection.query(sql, [test, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

module.exports= Test;