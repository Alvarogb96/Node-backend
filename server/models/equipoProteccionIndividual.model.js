const connection = require('../config/database');

//EquipoProteccionIndividual
var EquipoProteccionIndividual= function(equipoProteccionIndividual){
    this.id_epi                = equipoProteccionIndividual.id_epi;
    this.id_tipo               = equipoProteccionIndividual.id_tipo;
    this.lote                  = equipoProteccionIndividual.lote;
    this.caducidad             = equipoProteccionIndividual.caducidad;
    this.cantidad              = equipoProteccionIndividual.cantidad;
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


EquipoProteccionIndividual.update = function(id, epi, result){
    const sql = 'UPDATE equipos_proteccion_individual SET ? WHERE id_epi = ?';
    connection.query(sql, [epi, id], function (err, res) {
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
            console.log(err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

EquipoProteccionIndividual.updateCantidad = function(id, cantidad, result){
    const sql = 'UPDATE equipos_proteccion_individual SET cantidad = cantidad + ? WHERE id_epi = ?';
    connection.query(sql, [cantidad, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

EquipoProteccionIndividual.findAllAvailable = function (result) {
    const sql = 'SELECT id_tipo,MAX(cantidad) AS cantidad,descripcion,image FROM equipos_proteccion_individual INNER JOIN tipos_epi' +
     ' on tipos_epi.id_tipo_epi = equipos_proteccion_individual.id_tipo WHERE oculto = "N" GROUP BY id_tipo;';
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

EquipoProteccionIndividual.findAllEpis = function (result) {
    const sql = 'SELECT id_epi,cantidad,descripcion,lote FROM equipos_proteccion_individual INNER JOIN tipos_epi' +
    ' on tipos_epi.id_tipo_epi = equipos_proteccion_individual.id_tipo';
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

EquipoProteccionIndividual.getEpisAnalisis= function ( result) {
    const sql = 'SELECT id_tipo, descripcion,  sum(cantidad) as cantidad ' + 
    'FROM equipos_proteccion_individual ' + 
    'INNER JOIN tipos_epi on tipos_epi.id_tipo_epi = equipos_proteccion_individual.id_tipo ' +
    'GROUP BY id_tipo;';
    connection.query(sql,function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};


module.exports = EquipoProteccionIndividual;