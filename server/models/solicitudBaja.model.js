const connection = require('../config/database');
const multer = require('multer');
var upload = multer({ dest: 'files/solicitudesBaja/' })
const Constantes = require('../config/constantes');

//Solicitud_Baja
var SolicitudBaja= function(solicitudBaja){
    this.id_solicitud_baja = solicitudBaja.id_solicitud_baja;
    this.id_empleado              = solicitudBaja.id_empleado;
    this.id_directivo             = solicitudBaja.id_directivo;
    this.motivo                   = solicitudBaja.motivo;
    this.fecha_creacion           = solicitudBaja.fecha_creacion;
    this.fecha_aprobacion         = solicitudBaja.fecha_aprobacion;
    this.fecha_baja               = solicitudBaja.fecha_baja;
    this.fecha_alta               = solicitudBaja.fecha_alta;
    this.aprobada                 = solicitudBaja.aprobada;
    this.archivo_solicitud_baja   = solicitudBaja.archivo_solicitud_baja;
    this.fecha_actualizacion      = solicitudBaja.fecha_actualizacion;
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
    const sql = 'SELECT * FROM solicitudes_baja WHERE id_empleado =? ORDER BY solicitudes_baja.fecha_creacion desc';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

SolicitudBaja.findByParameters = function (parameters, result) {
    var sql = 'SELECT soli.*, usuarios.email FROM solicitudes_baja soli INNER JOIN usuarios on usuarios.id_usuario = soli.id_empleado ';
    if(parameters.estado !== null){
        if(parameters.estado === '-'){
            sql +=('WHERE soli.aprobada IS NULL ');
        } else {
            sql +=('WHERE soli.aprobada = "' + parameters.estado + '" ');
        }
    }
    if(parameters.email !== null && parameters.email !== ""){
        sql +=('AND usuarios.email = "' + parameters.email + '" ');
    }
    if(parameters.sucursal !== null && parameters.sucursal !== ""){
        sql +=('AND usuarios.id_sucursal = "' + parameters.sucursal + '" ');
    }
    if(parameters.id_propio !== null && parameters.id_propio !== ""){
        sql +=('AND soli.id_empleado != "' + parameters.id_propio + '" ');
    }
     sql +=('order by soli.fecha_creacion desc');
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
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

SolicitudBaja.update = function(id,solicitudBaja, result){
    const sql = 'UPDATE solicitudes_baja SET id_directivo = ?, fecha_aprobacion = ?, aprobada = ?, fecha_baja = ?, fecha_alta = ? WHERE id_solicitud_baja= ?';
    connection.query(sql, [solicitudBaja.id_directivo,solicitudBaja.fecha_aprobacion, solicitudBaja.aprobada, solicitudBaja.fecha_baja, solicitudBaja.fecha_alta, id], function (err, res) {
        if(err) {
            console.log(err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

SolicitudBaja.saveSolicitudBaja = function(){
    upload
};

SolicitudBaja.getAltasAnalisis = function ( result) {
    const sql = 'SELECT MONTH(fecha_alta) as mes, YEAR(fecha_alta) as año,  COUNT(id_solicitud_baja) as numAltas ' + 
    'FROM solicitudes_baja ' +
    'WHERE fecha_alta is not null ' +
    'GROUP BY MONTH(fecha_alta), YEAR(fecha_alta) ' +
    'ORDER BY MONTH(fecha_alta) ASC, YEAR(fecha_alta) ASC;';
    connection.query(sql,function (err, res) {             
        if(err) {
            console.log(err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

SolicitudBaja.getBajasAnalisis = function ( result) {
    const sql = 'SELECT MONTH(fecha_baja) as mes, YEAR(fecha_baja) as año,  COUNT(id_solicitud_baja) as numBajas ' + 
    'FROM solicitudes_baja ' +
    'WHERE fecha_baja is not null ' +
    'GROUP BY MONTH(fecha_baja), YEAR(fecha_baja) ' +
    'ORDER BY MONTH(fecha_baja) ASC, YEAR(fecha_baja) ASC;';
    connection.query(sql,function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

SolicitudBaja.validation = function(solicitudBaja){
    if(solicitudBaja.motivo === null || solicitudBaja.motivo === undefined || solicitudBaja.motivo === '' || solicitudBaja.motivo.length > 255){
        return Constantes.MOTIVO_BAJA;
    } else{
        return true;
    } 
}

module.exports= SolicitudBaja;