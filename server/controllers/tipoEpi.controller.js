const TipoEpi = require('../models/tipoEpi.model');

exports.create = async function(req, res) {
    const tipoEpi = new TipoEpi(req.body);
            TipoEpi.create(tipoEpi, function(err, tipoEpi) {
            if (err) {
                res.json({error:true,err});
            } else {
                res.json({error:false,message:"Tipo epi añadido"});
            }
        });
};

exports.findAll = function(req, res) {
    TipoEpi.findAll(function(err, tiposEpi) {
    if(err){
        throw err;   
    } else if(tiposEpi.length > 0){
        res.status(200).json({tiposEpi});
    } else {
        res.send("No hay tipos de equipos de protección individual registrados en el sistema");
    }
    });
};

exports.findById = function(req, res) {
    TipoEpi.findById(req.params.id, function(err, tipoEpi) {
        if (err)
        res.send(err);
        if(tipoEpi.length > 0){
            res.status(200).json({tipoEpi: tipoEpi});
        } else {
            res.status(404).send('Tipo de equipo de protección individual no registrada en el sistema')
        }
    });
};