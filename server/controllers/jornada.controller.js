const Jornada = require('../models/jornada.model');

exports.findAll = function (req, res) {
    if (req.body.role === process.env.ROLE_DIRECTIVO) {
        Jornada.findAll(function (err, jornadas) {
            if (err) {
                console.log(err)
            } else if (jornadas.length > 0) {
                res.status(200).json({ jornadas });
            } else {
                res.send("No hay jornadas registradas en el sistema");
            }
        });
    } else {
        res.status(500).send('Error permisos');
    }
};


exports.create = async function(req, res) {
    const jornada = new Jornada(req.body.jornada);
//    if(!validation(test)){
//         res.status(400).send({ error:true, message: 'Valores incorrectos' });
    // }else{
        Jornada.create(jornada, function(err, jornada) {
            if (err) {
            throw err;
            } else {
            res.send('Jornada añadida');
            }
        });
    // }
};

exports.findByIdEmpleado = function(req, res) {
    Jornada.findByIdEmpleado(req.params.id, function(err, jornada) {
        if (err)
        res.send(err);
        if(jornada.length > 0){
            res.status(200).json({jornada: jornada});
        } else {
            res.status(404).send('Error consulta')
        }
    });
};

exports.findById = function(req, res) {
    Jornada.findById(req.params.id, function(err, jornada) {
        if (err)
        res.send(err);
        if(jornada.length > 0){
            res.status(200).json({jornada: jornada});
        } else {
            res.status(404).send('Jornada no registrada en el sistema')
        }
    });
};