const connection = require('../config/database');

//Solicitud_Baja
var Solicitud_Baja= function(solicitud_Baja){
    this.id_empleado           = solicitud_Baja.id_empleado;
    this.id_directivo          = solicitud_Baja.id_directivo;
    this.motivo                = solicitud_Baja.motivo;
    this.fecha_solicitud       = solicitud_Baja.fecha_solicitud;
    this.fecha_aprobacion      = solicitud_Baja.fecha_aprobacion;
    this.fecha_baja            = solicitud_Baja.fecha_baja;
    this.fecha_alta            = solicitud_Baja.fecha_alta;
    this.aprobada              = solicitud_Baja.aprobada;
};

Solicitud_Baja.findAll = function (result) {
    const sql = 'SELECT * FROM solicitudes_baja';
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

Solicitud_Baja.findById = function (id, result) {
    const sql = 'SELECT * FROM solicitudes_baja WHERE id_solicitud_baja=?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Solicitud_Baja.findByIdEmpleado = function (id, result) {
    const sql = 'SELECT * FROM solicitudes_baja WHERE id_empleado =?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Solicitud_Baja.create = function (solicitud_Baja, result) {   
    const sql = 'INSERT INTO solicitudes_baja SET ?';
    connection.query(sql, solicitud_Baja, function (err, res) {
        if(err) {
            console.log(err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

Solicitud_Baja.update = function(id, solicitud_Baja, result){
    const sql = 'UPDATE solicitudes_baja SET ? WHERE id_solicitud_baja= ?';
    connection.query(sql, [solicitud_Baja, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

module.exports= Solicitud_Baja;