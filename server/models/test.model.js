const connection = require('../config/database');
const Constantes = require('../config/constantes');

//Test 
var Test = function(test){
    this.id_test               = test.id_test;
    this.id_empleado           = test.id_empleado;
    this.id_tipo               = test.id_tipo;
    this.resultado             = test.resultado;
    this.clinica               = test.clinica;
    this.fecha_test            = test.fecha_test;
    this.nombre_archivo        = test.nombre_archivo;
    this.fecha_creacion        = test.fecha_creacion;
    this.fecha_actualizacion   = test.fecha_actualizacion;
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
    const sql = 'SELECT tests.*, tipos_test.nombre FROM tests  INNER JOIN tipos_test on tipos_test.id_tipo = tests.id_tipo WHERE id_empleado = ? AND tests.oculto IS FALSE order by tests.fecha_creacion desc';
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
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });           
};

Test.delete = function (test, result) {   
    const sql = 'UPDATE tests SET oculto = 1 ,fecha_actualizacion = ? WHERE id_test = ?';
    connection.query(sql, [test.fecha_actualizacion, test.id_test], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    });         
};

Test.update = function(id,test, result){
    const sql = 'UPDATE tests SET id_tipo = ?, resultado = ?, fecha_test = ?, clinica = ?, nombre_archivo = ?, fecha_actualizacion = ? WHERE id_test = ?';
    connection.query(sql, [test.id_tipo, test.resultado, test.fecha_test, test.clinica, test.nombre_archivo, test.fecha_actualizacion, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

Test.validation = function(test){
    if(test.resultado === null || test.resultado === undefined || test.resultado === '' || test.resultado.length > 45){
        return Constantes.RESULTADO_TEST;
    } else if(test.clinica === null || test.clinica === undefined || test.clinica === '' || test.clinica.length > 100){
        return Constantes.CLINICA_TEST;
    } else if(test.fecha_test === null || test.fecha_test === undefined || test.fecha_test === ''){
        return Constantes.FECHA_TEST;
    } else if(test.id_tipo === null || test.id_tipo === undefined || test.id_tipo === ''){
        return Constantes.TIPO_TEST;
    } else{
        return true;
    } 
}

module.exports= Test;