const connection = require('../config/database');
const Constantes = require('../config/constantes');

//Jornada
var Jornada= function(jornada){
    this.id_jornada            = jornada.id_jornada;
    this.id_empleado           = jornada.id_empleado;
    this.hora_inicio           = jornada.hora_inicio;
    this.hora_fin              = jornada.hora_fin;
    this.horas_semanales       = jornada.horas_semanales;
    this.fecha_creacion        = jornada.fecha_creacion;
    this.fecha_actualizacion   = jornada.fecha_actualizacion;
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
    const sql = 'UPDATE jornadas SET hora_inicio = ?, hora_fin = ?, horas_semanales = ?, fecha_actualizacion = ? WHERE id_jornada = ?';
    connection.query(sql, [jornada.hora_inicio, jornada.hora_fin, jornada.horas_semanales, jornada.fecha_actualizacion, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

Jornada.validation = function(jornada){
    if(jornada.hora_inicio === null || jornada.hora_inicio === undefined || jornada.hora_inicio === ''){
        return Constantes.HORA_INICIO;
    } else if(jornada.hora_fin === null || jornada.hora_fin === undefined || jornada.hora_fin === ''){
        return Constantes.HORA_FIN;
    } else if(jornada.horas_semanales === null || jornada.horas_semanales === undefined || jornada.horas_semanales === ''){
        return Constantes.HORAS_SEMANALES;

    } else{
        return true;
    } 
}

module.exports= Jornada;