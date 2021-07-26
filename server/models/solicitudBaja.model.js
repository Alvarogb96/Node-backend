const connection = require('../config/database');
const multer = require('multer');
var upload = multer({ dest: 'files/solicitudesBaja/' })

//Solicitud_Baja
var SolicitudBaja= function(solicitudBaja){
    this.id_empleado           = solicitudBaja.id_empleado;
    this.id_directivo          = solicitudBaja.id_directivo;
    this.motivo                = solicitudBaja.motivo;
    this.fecha_solicitud       = solicitudBaja.fecha_solicitud;
    this.fecha_aprobacion      = solicitudBaja.fecha_aprobacion;
    this.fecha_baja            = solicitudBaja.fecha_baja;
    this.fecha_alta            = solicitudBaja.fecha_alta;
    this.aprobada              = solicitudBaja.aprobada;
};

SolicitudBaja.findAll = function (result) {
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

SolicitudBaja.findById = function (id, result) {
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

SolicitudBaja.findByIdEmpleado = function (id, result) {
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

SolicitudBaja.create = function (solicitudBaja, result) {   
    upload.single('solicitud');
    const sql = 'INSERT INTO solicitudes_baja SET ?';
    connection.query(sql, solicitudBaja, function (err, res) {
        if(err) {
            console.log(err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

SolicitudBaja.update = function(id, solicitudBaja, result){
    const sql = 'UPDATE solicitudes_baja SET ? WHERE id_solicitud_baja= ?';
    connection.query(sql, [solicitudBaja, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

SolicitudBaja.saveSolicitudBaja = function(){
    upload
};

module.exports= SolicitudBaja;