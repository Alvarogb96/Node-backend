const TipoVacuna = require('../models/tipoVacuna.model');

exports.create = async function(req, res) {
    const tipoVacuna = new TipoVacuna(req.body);
    TipoVacuna.create(tipoVacuna, function(err, tipoVacuna) {
            if (err) {
            throw err;
            } else {
            res.send('Tipo de vacuna añadido');
            }
        });
};

exports.findAll = function(req, res) {
    TipoVacuna.findAll(function(err, tiposVacuna) {
    if(err){
        throw err;   
    } else if(tiposVacuna.length > 0){
        res.status(200).json({tiposVacuna});
    } else {
        res.send("No hay tipos de vacuna registrados en el sistema");
    }
    });
};

exports.findById = function(req, res) {
    TipoVacuna.findById(req.params.id, function(err, tipoVacuna) {
        if (err)
        res.send(err);
        if(tipoVacuna.length > 0){
            res.status(200).json({tipoVacuna: tipoVacuna});
        } else {
            res.status(404).send('Tipo de vacuna no registrado en el sistema')
        }
    });
};