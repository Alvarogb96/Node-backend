const SolicitudBaja = require('../models/solicitudBaja.model');
const path = require('path');

exports.findAll = function (req, res) {
    if (req.body.role === process.env.ROLE_DIRECTIVO) {
        SolicitudBaja.findAll(function (err, solicitudesBaja) {
            if (err) {
                res.json({error:true,err});
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

exports.findByParameters = function (req, res) {
        SolicitudBaja.findByParameters(req.body,function (err, solicitudesBaja) {
            if (err) {
                res.json({error:true,err});
            } else if (solicitudesBaja.length > 0) {
                res.status(200).json({ solicitudesBaja });
            } else {
                res.status(404).send('Error en la consulta de solicitudes con esos parámetros')
            }
        });
};

exports.create = function (req, res) {
    const solicitudBaja = new SolicitudBaja(req.body);
    var mensaje = SolicitudBaja.validation(solicitudBaja);
    if (mensaje != true) {
        res.status(400).send({ error: true, message: 'Valor incorrecto de ' + mensaje });
    } else {
        SolicitudBaja.create(solicitudBaja, function (err, solicitudBaja) {
            if (err) {
                res.json({ error: true, err });
            } else {
                res.json({ error: false, message: "Solicitud de baja añadida", data: solicitudBaja });
            }
        });
    }
};

exports.update = function(req, res) {
    const solicitudBaja = req.body;
        SolicitudBaja.update(solicitudBaja.id_solicitud_baja,solicitudBaja, function(err, solicitudBaja) {
            if (err){
                res.json({error:true,err});
            }
            else {
                res.json({error:false,message:"Solicitud actualizada",data:solicitudBaja})
            }
        });
};
    
exports.subirArchivo = function(req,res){
    if (!req.file) {
        console.log("Archivo disponible");
        return res.send({
          success: false
        });
    
      } else {
        console.log('Archivo no disponible');
        return res.send({
          success: true
        })
      }
}


exports.descargarArchivo = function(req,res){
    const file = path.resolve(`./files/solicitudesBaja/`+ req.params.nombreArchivo);    
    res.download(file); 
}



exports.getBajasAnalisis = function (req, res) {
    bajas = [];
    altas = [];
    SolicitudBaja.getBajasAnalisis(function (err, solicitudesBajas) {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else if (solicitudesBajas.length > 0) {
            bajas = solicitudesBajas;
            SolicitudBaja.getAltasAnalisis(function (err, solicitudesAltas) {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                } else if (solicitudesAltas.length > 0) {
                    altas = solicitudesAltas;
                    res.status(200).json({ bajas,  altas});
                } else {
                    res.send("No hay solicitudes en el sistema.");
                }
            });
        } else {
            res.send("No hay solicitudes en el sistema.");
        }
    });

    

};

