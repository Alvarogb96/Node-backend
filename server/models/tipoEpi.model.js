const connection = require('../config/database');

var TipoEpi = function(tipoEpi){
    this.descripcion                = tipoEpi.descripcion;
};

TipoEpi.create = function (tipoEpi, result) {   
    const sql = 'INSERT INTO tipos_epi SET ?';
    
    connection.query(sql, tipoEpi, function (err, res) {
        if(err) {
            console.log(err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

TipoEpi.findById = function (id, result) {
    const sql = 'SELECT * FROM tipos_epi WHERE id_tipo_epi =?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

TipoEpi.findAll = function (result) {
    const sql = 'SELECT * FROM tipos_epi';
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

module.exports = TipoEpi;