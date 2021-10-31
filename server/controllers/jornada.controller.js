const Jornada = require('../models/jornada.model');

exports.findAll = function (req, res) {
        Jornada.findAll(function (err, jornadas) {
            if (err) {
                res.json({error:true,err});
            } else if (jornadas.length > 0) {
                res.status(200).json({ jornadas });
            } else {
                res.send("No hay jornadas registradas en el sistema");
            }
        });
};


exports.create = async function(req, res) {
    const jornada = new Jornada(req.body.jornada);
        Jornada.create(jornada, function(err, jornada) {
            if (err) {
                res.json({error:true,err});
            } else {
            res.send('Jornada añadida');
            }
        });
};

exports.findByIdEmpleado = function(req, res) {
    Jornada.findByIdEmpleado(req.params.id, function(err, jornada) {
        if (err)
        res.json({error:true,err});
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
        res.json({error:true,err});
        if(jornada.length > 0){
            res.status(200).json({jornada: jornada});
        } else {
            res.status(404).send('Jornada no registrada en el sistema')
        }
    });
};

exports.update = function(req, res) {
    const jornada = new Jornada(req.body);
    var mensaje = Jornada.validation(jornada);
    if(mensaje != true){
        res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
    }else{
        if(jornada.id_jornada != null){
            Jornada.update(jornada.id_jornada,jornada, function(err, jornada) {
                if (err){
                    res.json({error:true,err});
                }
                else {
                    res.json({error:false,message:"Jornada actualizada"})
                }
            });
        } else {
            Jornada.create(jornada, function(err, jornada) {
                if (err){
                    res.json({error:true,err});
                }
                else {
                    res.json({error:false,message:"Jornada creada correctamente"})
                }
            });
        }
    }
};