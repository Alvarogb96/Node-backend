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


module.exports = EquipoProteccionIndividual;