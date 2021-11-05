const connection = require('../config/database');
const Constantes = require('../config/constantes');

EquipoProteccionIndividual
var EquipoProteccionIndividual= function(equipoProteccionIndividual){
    this.id_epi                = equipoProteccionIndividual.id_epi;
    this.id_tipo               = equipoProteccionIndividual.id_tipo;
    this.lote                  = equipoProteccionIndividual.lote;
    this.cantidad              = equipoProteccionIndividual.cantidad;
    this.fecha_creacion        = equipoProteccionIndividual.fecha_creacion;
    this.fecha_actualizacion   = equipoProteccionIndividual.fecha_actualizacion;
    this.id_sucursal           = equipoProteccionIndividual.id_sucursal;
    this.existencias           = equipoProteccionIndividual.existencias;
    this.fecha_disponibilidad  = equipoProteccionIndividual.fecha_disponibilidad;
};

EquipoProteccionIndividual.findAll = function (result) {
    const sql = 'SELECT * FROM equipos_proteccion_individual';
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};


EquipoProteccionIndividual.update = function(id,epi, result){
    const sql = 'UPDATE equipos_proteccion_individual SET id_tipo = ?, lote = ?, existencias = ?, fecha_actualizacion = ? WHERE id_epi = ?';
    connection.query(sql, [epi.id_tipo, epi.lote, epi.existencias, epi.fecha_actualizacion, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

EquipoProteccionIndividual.delete = function (epi, result) {       
    const sql = 'UPDATE equipos_proteccion_individual SET oculto = 1 ,fecha_actualizacion = ? WHERE id_epi = ?';
    connection.query(sql, [epi.fecha_actualizacion, epi.id_epi], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    });
};

EquipoProteccionIndividual.create = function (epi, result) {  
    const sql = 'INSERT INTO equipos_proteccion_individual SET ?';
    connection.query(sql, epi, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

EquipoProteccionIndividual.updateCantidad = function(id, cantidad, result){
    const sql = 'UPDATE equipos_proteccion_individual SET existencias = existencias + ? WHERE id_epi = ?';
    connection.query(sql, [cantidad, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

EquipoProteccionIndividual.findAllAvailable = function (id,date,result) {
    const sql = 'SELECT id_tipo,MAX(existencias) AS cantidad,descripcion,image FROM equipos_proteccion_individual INNER JOIN tipos_epi' +
     ' on tipos_epi.id_tipo_epi = equipos_proteccion_individual.id_tipo WHERE equipos_proteccion_individual.oculto IS FALSE  AND equipos_proteccion_individual.existencias > 0' + 
     ' AND equipos_proteccion_individual.id_sucursal =? AND equipos_proteccion_individual.fecha_disponibilidad <= ? GROUP BY id_tipo;';
    connection.query(sql, [id,date], function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

EquipoProteccionIndividual.findByIdSucursal = function (id,result) {
    const sql = 'SELECT id_epi,existencias,descripcion,lote, cantidad, id_tipo, fecha_disponibilidad FROM equipos_proteccion_individual INNER JOIN tipos_epi' +
    ' on tipos_epi.id_tipo_epi = equipos_proteccion_individual.id_tipo WHERE equipos_proteccion_individual.oculto is false AND equipos_proteccion_individual.id_sucursal =? order by equipos_proteccion_individual.fecha_creacion desc';
    connection.query(sql, id, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

EquipoProteccionIndividual.findByIdSucursalDisponible = function (id,date, result) {
    const sql = 'SELECT id_epi,existencias,descripcion,lote, cantidad, id_tipo FROM equipos_proteccion_individual INNER JOIN tipos_epi' +
    ' on tipos_epi.id_tipo_epi = equipos_proteccion_individual.id_tipo WHERE equipos_proteccion_individual.oculto is false' + 
    ' AND equipos_proteccion_individual.id_sucursal =? AND equipos_proteccion_individual.fecha_disponibilidad <= ? order by equipos_proteccion_individual.fecha_creacion desc';
    connection.query(sql, [id,date], function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

EquipoProteccionIndividual.getEpisAnalisis= function (id, date, result) {
    const sql = 'SELECT tipos_epi.id_tipo_epi, descripcion, SUM(existencias) as cantidad, minimo ' + 
    'FROM equipos_proteccion_individual ' + 
    'INNER JOIN tipos_epi on tipos_epi.id_tipo_epi = equipos_proteccion_individual.id_tipo ' +
    'INNER JOIN sucursales_stock_epi on sucursales_stock_epi.id_tipo_epi = tipos_epi.id_tipo_epi ' + 
    'where equipos_proteccion_individual.oculto is false AND equipos_proteccion_individual.id_sucursal = ? ' +
    'AND equipos_proteccion_individual.fecha_disponibilidad <= ? AND sucursales_stock_epi.id_sucursal = ? ' +
    'GROUP BY id_tipo, minimo;';
    connection.query(sql,[id, date, id],function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

EquipoProteccionIndividual.validation = function(epi){
    if(epi.id_tipo === null || epi.id_tipo === undefined || epi.id_tipo === ''){
        return Constantes.TIPO_EPI;
    } else if(epi.lote === null || epi.lote === undefined || epi.lote === '' || epi.lote.length > 100){
        return Constantes.LOTE_EPI;
    } else if(epi.cantidad === null || epi.cantidad === undefined || epi.cantidad === ''){
        return Constantes.CANTIDAD_EPI;
    } else if(epi.fecha_disponibilidad === null || epi.fecha_disponibilidad === undefined || epi.fecha_disponibilidad === ''){
        return Constantes.FECHA_DISPONIBILIDAD;
    } else{
        return true;
    } 
}


module.exports = EquipoProteccionIndividual;