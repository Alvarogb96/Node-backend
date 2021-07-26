const connection = require('../config/database');

//SolicitudEpi
var SolicitudEpi= function(solicitudEpi,materiales_solicitud){
    this.id_solicitud           = solicitudEpi.id_solicitud;
    this.id_empleado           = solicitudEpi.id_empleado;
    this.id_directivo          = solicitudEpi.id_directivo;
    this.fecha_solicitud       = solicitudEpi.fecha_solicitud;
    this.fecha_aprobacion      = solicitudEpi.fecha_aprobacion;
    this.aprobada              = solicitudEpi.aprobada;
    this.materialesSolicitud   = materiales_solicitud;
};

SolicitudEpi.findAll = function (result) {
    const sql = 'SELECT * FROM solicitudes_epi';
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

SolicitudEpi.findByIdEmpleado = function (id, result) {
    const sql = 'SELECT DISTINCT soli.*  FROM solicitudes_epi soli WHERE id_empleado =? ORDER BY soli.fecha_solicitud desc';
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
            console.log(err);
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
            console.log(err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

SolicitudEpi.update = function(id, solicitudEpi, result){
    const sql = 'UPDATE solicitudes_epi SET ? WHERE id_solicitud = ?';
    connection.query(sql, [solicitudEpi, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};


module.exports = SolicitudEpi;
