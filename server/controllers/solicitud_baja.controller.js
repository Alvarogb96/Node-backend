const Solicitud_Baja = require('../models/solicitud_baja.model');

exports.findAll = function (req, res) {
    if (req.body.role === process.env.ROLE_DIRECTIVO) {
        Solicitud_Baja.findAll(function (err, solicitudes_Baja) {
            if (err) {
                console.log(err)
            } else if (solicitudes_Baja.length > 0) {
                res.status(200).json({ solicitudes_Baja });
            } else {
                res.send("No hay solicitudes de baja registradas en el sistema");
            }
        });
    } else {
        res.status(500).send('Error permisos');
    }
};

exports.findById = function(req, res) {
    Solicitud_Baja.findById(req.params.id, function(err, solicitud_baja) {
        if (err)
        return res.status(400).json({
            ok: false,
            err
        });
        if(solicitud_baja.length > 0){
            res.status(200).json({solicitud_baja: solicitud_baja});
        } else {
            res.status(404).send('Solicitud de baja no registrada en el sistema')
        }
    });
};

exports.findByIdEmpleado = function(req, res) {
    Solicitud_Baja.findByIdEmpleado(req.params.id, function(err, solicitudes_baja) {
        if (err)
        return res.status(400).json({
            ok: false,
            err
        });
        if(solicitudes_baja.length > 0){
            res.status(200).json({solicitudes_baja: solicitudes_baja});
        } else {
            res.status(404).send('Error consulta')
        }
    });
};

exports.create = async function(req, res) {
    const solicitud_baja = new Solicitud_Baja(req.body.solicitud_baja);
//    if(!validation(Solicitud_Baja)){
//         res.status(400).send({ error:true, message: 'Valores incorrectos' });
    // }else{
        Solicitud_Baja.create(solicitud_baja, function(err, solicitud_baja) {
            if (err) {
            throw err;
            } else {
            res.send('Solicitud de baja añadida');
            }
        });
    // }
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body.solicitud_baja).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Solicitud_Baja.update(req.params.id, new Solicitud_Baja(req.body.solicitud_baja), function(err, solicitud_baja) {
            if (err)
            res.send(err);
            res.send('Solicitud actualizada correctamente');
        });
    }
  
};
