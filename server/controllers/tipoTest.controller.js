const TipoTest = require('../models/tipoTest.model');

exports.create = async function(req, res) {
    const tipoTest = new TipoTest(req.body.tipoTest);
            TipoTest.create(tipoTest, function(err, tipoTest) {
            if (err) {
            throw err;
            } else {
            res.send('Tipo de test añadido');
            }
        });
};

exports.findAll = function(req, res) {
    TipoTest.findAll(function(err, tiposTest) {
    if(err){
        throw err;   
    } else if(tiposTest.length > 0){
        res.status(200).json({tiposTest});
    } else {
        res.send("No hay tipos de test registrados en el sistema");
    }
    });
};

exports.findById = function(req, res) {
    TipoTest.findById(req.params.id, function(err, tipoTest) {
        if (err)
        res.send(err);
        if(tipoTest.length > 0){
            res.status(200).json({tipoTest: tipoTest});
        } else {
            res.status(404).send('Tipo de test no registrado en el sistema')
        }
    });
};