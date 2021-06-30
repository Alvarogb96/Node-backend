const TipoEpi = require('../models/tipoEpi.model');

exports.create = async function(req, res) {
    const tipoEpi = new TipoEpi(req.body.tipoEpi);
//    if(!validation(noticia)){
//         res.status(400).send({ error:true, message: 'Valores incorrectos' });
//     }else{
        if(req.body.role == process.env.ROLE_DIRECTIVO){
            TipoEpi.create(tipoEpi, function(err, tipoEpi) {
            if (err) {
            throw err;
            } else {
            res.send('Tipo de equipo de protección añadido');
            }
        });
        } else {
            res.status(500).send('No tiene los permisos para registra tipos de equipos de protección individual en el sistema')
        }
    // }
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