const connection = require('../config/database');

var TipoVacuna = function(tipoVacuna){
    this.nombre = tipoVacuna.nombre;
};

TipoVacuna.create = function (tipoVacuna, result) {   
    const sql = 'INSERT INTO tipos_vacuna SET ?';
    
    connection.query(sql, tipoVacuna, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

TipoVacuna.findById = function (id, result) {
    const sql = 'SELECT * FROM tipos_vacuna WHERE id_tipo =?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

TipoVacuna.findAll = function (result) {
    const sql = 'SELECT * FROM tipos_vacuna';
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

module.exports = TipoVacuna;