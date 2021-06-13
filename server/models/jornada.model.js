const connection = require('../database');

//Jornada
var Jornada= function(jornada){
    this.id_empleado           = jornada.id_empleado;
    this.hora_inicio           = jornada.hora_inicio;
    this.hora_fin              = jornada.hora_fin;
    this.horas_semanales       = jornada.horas_semanales;
};

Jornada.findAll = function (result) {
    const sql = 'SELECT * FROM jornadas';
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

Jornada.findById = function (id, result) {
    const sql = 'SELECT * FROM jornadas WHERE id_jornada=?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Jornada.findByIdEmpleado = function (id, result) {
    const sql = 'SELECT * FROM jornadas WHERE id_empleado =?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Jornada.create = function (jornada, result) {   
    const sql = 'INSERT INTO jornadas SET ?';
    
    connection.query(sql, jornada, function (err, res) {
        if(err) {
            console.log(err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

Jornada.update = function(id, jornada, result){
    const sql = 'UPDATE jornadas SET ? WHERE id_Jornada= ?';
    connection.query(sql, [jornada, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

module.exports= Jornada;