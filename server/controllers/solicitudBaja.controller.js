const SolicitudBaja = require('../models/solicitudBaja.model');

exports.findAll = function (req, res) {
    if (req.body.role === process.env.ROLE_DIRECTIVO) {
        SolicitudBaja.findAll(function (err, solicitudesBaja) {
            if (err) {
                console.log(err)
            } else if (solicitudesBaja.length > 0) {
                res.status(200).json({ solicitudesBaja });
            } else {
                res.send("No hay solicitudes de baja registradas en el sistema");
            }
        });
    } else {
        res.status(500).send('Error permisos');
    }
};

exports.findById = function(req, res) {
    SolicitudBaja.findById(req.params.id, function(err, solicitudBaja) {
        if (err)
        return res.status(400).json({
            ok: false,
            err
        });
        if(solicitudBaja.length > 0){
            res.status(200).json({solicitudBaja: solicitudBaja});
        } else {
            res.status(404).send('Solicitud de baja no registrada en el sistema')
        }
    });
};

exports.findByIdEmpleado = function(req, res) {
    SolicitudBaja.findByIdEmpleado(req.params.id, function(err, solicitudesBaja) {
        if (err)
        return res.status(400).json({
            ok: false,
            err
        });
        if(solicitudesBaja.length > 0){
            res.status(200).json({solicitudesBaja: solicitudesBaja});
        } else {
            res.status(404).send('Error consulta')
        }
    });
};

exports.create =  function(req, res) {
    const solicitudBaja = new SolicitudBaja(req.body.solicitudBaja);
//    if(!validation(Solicitud_Baja)){
//         res.status(400).send({ error:true, message: 'Valores incorrectos' });
    // }else{
        SolicitudBaja.create(solicitudBaja, function(err, solicitudBaja) {
            if (err) {
            throw err;
            } else {
            res.send('Solicitud de baja añadida');
            }
        });
    // }
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body.solicitudBaja).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        SolicitudBaja.update(req.params.id, new SolicitudBaja(req.body.solicitudBaja), function(err, solicitudBaja) {
            if (err)
            res.send(err);
            res.send('Solicitud actualizada correctamente');
        });
    }
  
};
