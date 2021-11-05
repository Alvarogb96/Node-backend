const connection = require('../config/database');

//SolicitudEpi
var SolicitudEpi= function(solicitudEpi,materiales_solicitud){
    this.id_solicitud           = solicitudEpi.id_solicitud;
    this.id_empleado           = solicitudEpi.id_empleado;
    this.id_directivo          = solicitudEpi.id_directivo;
    this.fecha_creacion      = solicitudEpi.fecha_creacion;
    this.fecha_aprobacion      = solicitudEpi.fecha_aprobacion;
    this.aprobada              = solicitudEpi.aprobada;
    this.materialesSolicitud   = materiales_solicitud;
};

SolicitudEpi.findAll = function (result) {
    const sql = 'SELECT * FROM solicitudes_epi WHERE oculto is false order by solicitudes_epi.fecha_creacion desc';
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

SolicitudEpi.findByParameters = function (parameters, result) {
    var sql = 'SELECT soli.*, usuarios.email FROM solicitudes_epi soli INNER JOIN usuarios on usuarios.id_usuario = soli.id_empleado WHERE soli.oculto is false ';
    if(parameters.estado !== null){
        if(parameters.estado === '-'){
            sql +=('AND soli.aprobada IS NULL ');
        } else {
            sql +=('AND soli.aprobada = "' + parameters.estado + '" ');
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


SolicitudEpi.findById = function (id, result) {
    const sql = 'SELECT * FROM solicitudes_epi WHERE id_solicitud=?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

SolicitudEpi.findEpiByIdSolicitud = function (id, result) {
    const sql = 'SELECT * FROM materiales_solicitud INNER JOIN equipos_proteccion_individual on materiales_solicitud.id_material = equipos_proteccion_individual.id_epi WHERE id_solicitud_epi=?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

SolicitudEpi.findMaterialesSolicitud = function (id, result) {
    const sql = 'SELECT * FROM materiales_solicitud WHERE id_solicitud_epi=?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

SolicitudEpi.findByIdEmpleadoMateriales = function (id, result) {
    const sql = 'SELECT  mat.* , eq.*, te.* FROM solicitudes_epi soli INNER JOIN materiales_solicitud mat ON soli.id_solicitud = mat.id_solicitud_epi ' +
    'INNER JOIN equipos_proteccion_individual eq on mat.id_material = eq.id_epi ' +
    'INNER JOIN tipos_epi te on eq.id_tipo = te.id_tipo_epi WHERE id_empleado =?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

SolicitudEpi.findByIdSolicitudMateriales = function (id, result) {
    const sql = 'SELECT  mat.* , eq.*, te.* FROM solicitudes_epi soli INNER JOIN materiales_solicitud mat ON soli.id_solicitud = mat.id_solicitud_epi ' +
    'INNER JOIN equipos_proteccion_individual eq on mat.id_material = eq.id_epi ' +
    'INNER JOIN tipos_epi te on eq.id_tipo = te.id_tipo_epi WHERE soli.id_solicitud  =?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

SolicitudEpi.findByIdEmpleado = function (id, result) {
    const sql = 'SELECT DISTINCT soli.*  FROM solicitudes_epi soli WHERE id_empleado =? ORDER BY soli.fecha_creacion desc';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

SolicitudEpi.createSolicitud = function (solicitudEpi, result) {   
    const sql = 'INSERT INTO solicitudes_epi SET ?';
    connection.query(sql, solicitudEpi, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

SolicitudEpi.createSolicitudEpis = function (materialesSolicitud, result) {   
    const sql = 'INSERT INTO materiales_solicitud(id_solicitud_epi,id_material,cantidad_material_solicitado) VALUES ?';
    connection.query(sql,[materialesSolicitud], function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

SolicitudEpi.update = function(id, solicitudEpi, result){
    const sql = 'UPDATE solicitudes_epi SET id_directivo = ?, fecha_aprobacion = ?, aprobada = ?, fecha_actualizacion = ? WHERE id_solicitud = ?';
    connection.query(sql, [solicitudEpi.id_directivo, solicitudEpi.fecha_aprobacion, solicitudEpi.aprobada , solicitudEpi.fecha_actualizacion, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

SolicitudEpi.getSolicitudesAprobadas = function ( result) {
    const sql = 'SELECT MONTH(fecha_aprobacion) as mes, YEAR(fecha_aprobacion) as año,' +
    '( SELECT COUNT(*) FROM solicitudes_epi WHERE aprobada = "S" AND MONTH(fecha_aprobacion) like mes) as aprobadas,' + 
    '( SELECT COUNT(*) FROM solicitudes_epi WHERE aprobada = "N" AND MONTH(fecha_aprobacion) like mes) as rechazadas ' +
    'FROM solicitudes_epi '+
    'WHERE fecha_aprobacion IS NOT NULL ' +
    'GROUP BY MONTH(fecha_aprobacion), YEAR(fecha_aprobacion);';
    connection.query(sql,function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};


SolicitudEpi.delete = function (id, result) {   
    const sql = 'UPDATE solicitudes_epi SET oculto = 1 WHERE id_solicitud = ?';
    connection.query(sql, id, function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    });         
};



module.exports = SolicitudEpi;
