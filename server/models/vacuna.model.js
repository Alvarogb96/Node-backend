const connection = require('../config/database');
const Constantes = require('../config/constantes');

//Vacuna 
var Vacuna = function(vacuna){
    this.id_vacuna             = vacuna.id_vacuna
    this.id_empleado           = vacuna.id_empleado;
    this.id_tipo_vacuna        = vacuna.id_tipo_vacuna;
    this.pauta_completa        = vacuna.pauta_completa;
    this.fecha_vacuna          = vacuna.fecha_vacuna;
    this.nombre_archivo        = vacuna.nombre_archivo;
    this.fecha_creacion        = vacuna.fecha_creacion;
    this.fecha_actualizacion   = vacuna.fecha_actualizacion;
};

Vacuna.findAll = function (result) {
    const sql = 'SELECT * FROM vacunas';
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

Vacuna.findById = function (id, result) {
    const sql = 'SELECT * FROM vacunas WHERE id_vacuna =?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Vacuna.findByIdEmpleado = function (id, result) {
    const sql = 'SELECT vacunas.*, tipos_vacuna.nombre FROM vacunas  INNER JOIN tipos_vacuna on tipos_vacuna.id_tipo = vacunas.id_tipo_vacuna WHERE id_empleado =? AND vacunas.oculto IS FALSE order by vacunas.fecha_creacion desc';
    connection.query(sql, id, function (err, res) {            
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Vacuna.create = function (vacuna, result) {   
    const sql = 'INSERT INTO vacunas SET ?';
    
    connection.query(sql, vacuna, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });           
};

Vacuna.analisis = function(id, result){
    const sql = 'SELECT distinct(select count(distinct id_usuario) from usuarios where usuarios.id_sucursal = ?) as total, ' + 
    '(select count(distinct id_usuario) FROM usuarios left JOIN vacunas on usuarios.id_usuario = vacunas.id_empleado WHERE usuarios.id_sucursal = ? AND vacunas.id_empleado is null) as no_vacunados, ' + 
    '(select count(distinct id_usuario) FROM usuarios inner JOIN vacunas on usuarios.id_usuario = vacunas.id_empleado WHERE usuarios.id_sucursal = ? AND vacunas.pauta_completa = 1) as pauta_completa ' +
    'from usuarios;';
    connection.query(sql, [id, id, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 

}

Vacuna.delete = function (vacuna, result) {   
    const sql = 'UPDATE vacunas SET oculto = 1 ,fecha_actualizacion = ? WHERE id_vacuna= ?';
    connection.query(sql, [vacuna.fecha_actualizacion, vacuna.id_vacuna], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    });         
};

Vacuna.update = function(id,vacuna, result){
    const sql = 'UPDATE vacunas SET id_tipo_vacuna = ?, pauta_completa = ?, fecha_vacuna = ?, nombre_archivo = ?, fecha_actualizacion = ? WHERE id_vacuna = ?';
    connection.query(sql, [vacuna.id_tipo_vacuna, vacuna.pauta_completa, vacuna.fecha_vacuna, vacuna.nombre_archivo, vacuna.fecha_actualizacion, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

Vacuna.validation = function(vacuna){
    if(vacuna.pauta_completa === null || vacuna.pauta_completa === undefined || vacuna.pauta_completa === ''){
        return Constantes.PAUTA_COMPLETA_VACUNA;
    } else if(vacuna.fecha_vacuna === null || vacuna.fecha_vacuna === undefined || vacuna.fecha_vacuna === ''){
        return Constantes.FECHA_VACUNA;
    } else if(vacuna.id_tipo_vacuna === null || vacuna.id_tipo_vacuna === undefined || vacuna.id_tipo_vacuna === ''){
        return Constantes.TIPO_VACUNA;
    } else{
        return true;
    } 
}

module.exports= Vacuna;