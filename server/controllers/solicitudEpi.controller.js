const SolicitudEpi = require('../models/solicitudEpi.model');
const EquipoProteccionIndividual = require('../models/equipoProteccionIndividual.model');


exports.findAll = function (req, res) {
    if (req.body.role === process.env.ROLE_DIRECTIVO) {
        SolicitudEpi.findAll(function (err, solicitudesEpi) {
            if (err) {
                console.log(err)
            } else if (solicitudesEpi.length > 0) {
                res.status(200).json({ solicitudesEpi });
            } else {
                res.send("No hay solicitudes de equipos de protección individual registradas en el sistema");
            }
        });
    } else {
        res.status(500).send('Error permisos');
    }
};

exports.findById = function(req, res) {
    SolicitudEpi.findById(req.params.id, function(err, solicitudEpi) {
        if (err)
        return res.status(400).json({
            ok: false,
            err
        });
        if(solicitudEpi.length > 0){
            SolicitudEpi.findEpiByIdSolicitud(req.params.id, function(err, materiales_solicitud){
                if (err)
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                if(materiales_solicitud.length>0){
                    res.status(200).json({solicitudEpi: solicitudEpi, materiales_solicitud:materiales_solicitud});
                } 
                else{
                    res.status(404).json({solicitudEpi: solicitudEpi, message: 'Esta solicitud de equipo de protección individual no cuenta con ningún equipo asociado'});
                }
            });
        } else {
            res.status(404).send('Solicitud de equipo de protección individual no registrada en el sistema')
        }
    });
};


exports.findByIdEmpleado = function(req, res) {
    SolicitudEpi.findByIdEmpleado(req.params.id, function(err, solicitudesEpi) {
        if (err)
        return res.status(400).json({
            ok: false,
            err
        });
        if(solicitudesEpi.length > 0){
            SolicitudEpi.findByIdEmpleadoMateriales(req.params.id, function (err, materialesSolicitud) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                var solicitudesEpiEmpleado = [];
                for(var solicitudEpi of solicitudesEpi){
                    solicitudesEpiEmpleado.push(new SolicitudEpi(solicitudEpi, materialesSolicitud.filter((materialSolicitud) => materialSolicitud.id_solicitud_epi === solicitudEpi.id_solicitud)));
                }
                res.status(200).json({solicitudesEpiEmpleado: solicitudesEpiEmpleado});
            });
            //res.status(200).json({solicitudesEpi: solicitudesEpi});
        } else {
            res.status(404).send('Error consulta')
        }
    });
};

exports.create = function (req, res) {
    const solicitudEpi = req.body.solicitudEpi;
    var epis = req.body.epis;
    var id = null;
    //    if(!validation(Solicitud_Baja)){
    //         res.status(400).send({ error:true, message: 'Valores incorrectos' });
    // }else{

    EquipoProteccionIndividual.findAll(function (err, equiposProteccionIndividual) {
        if (err) {
            console.log(err)
        } else if (equiposProteccionIndividual.length > 0) {
            var materialesSolicitados = [];
            var episSolicitados = [];
            var create = true;
            for (var epi of epis) {
                var episTipo = equiposProteccionIndividual.filter((equipoProteccionIndividual) => (equipoProteccionIndividual.id_tipo === epi.id_tipo_epi) && (equipoProteccionIndividual.cantidad >= epi.cantidad_material));
                if (episTipo.length > 0) {
                    materialSolicitud = { id_solicitud_epi: null, id_material: episTipo[0].id_epi, cantidad_material_solicitado: epi.cantidad_material };
                    materialesSolicitados.push(materialSolicitud);
                    episTipo[0].cantidad = episTipo[0].cantidad - epi.cantidad_material;
                    episSolicitados.push(episTipo[0]);
                } else {
                    create = false;
                    res.status(404).json({
                        tipo: epi.id_tipo_epi,
                        mensaje: "No hay suficiente cantidad del equipo de protección"
                    });
                }
            }
            if (create) {
                SolicitudEpi.createSolicitud(solicitudEpi, function (err, solicitudEpi) {
                    if (err) {
                        throw err;
                    } else {
                        id = solicitudEpi.insertId;
                        cont = 0;
                        for(var materialSolicitado of materialesSolicitados){
                            materialSolicitado.id_solicitud_epi = id;
                            EquipoProteccionIndividual.update(materialSolicitado.id_material, episSolicitados[cont], function (err, epi) {
                                if (err)
                                    res.send(err);
                            });
                            cont++;
                        }
                        let arrayMateriales = materialesSolicitados.reduce((o, a) => {
                            let ini = [];
                            ini.push(a.id_solicitud_epi);
                            ini.push(a.id_material);
                            ini.push(a.cantidad_material_solicitado);
                            o.push(ini);
                            return o
                        }, [])
                        SolicitudEpi.createSolicitudEpis(arrayMateriales, function (err, materialesSolicitud) {
                            if (err) {
                                throw err;
                            } else {
                                res.send('Solicitud de equipo de protección individual añadida');
                            }
                        });
                    }
                });
            }
        } else {
            res.send("No hay equipos de protección individual registrados en el sistema");
        }
    });
};


exports.update = function(req, res){
    const solicitudEpi = req.body.solicitudEpi;
    var success = true;

        SolicitudEpi.update(solicitudEpi.id_solicitud, solicitudEpi, function(err, solicitudEpi) {
            if (err) {
                success = false;
                res.send(err);
            }
            
            //res.send('Solicitud actualizada correctamente');
        });
    if(solicitudEpi.aprobada === 'N'){
        SolicitudEpi.findMaterialesSolicitud(solicitudEpi.id_solicitud, function (err, materialesSolicitud){
            for(var material of materialesSolicitud){
                EquipoProteccionIndividual.updateCantidad(material.id_material, material.cantidad_material_solicitado, function(err, solicitudBaja) {
                    if (err) {
                        success = false;
                        res.send(err);
                    }          
                });
            }
        });
    }

    if(success = true){
        res.send('Solicitud actualizada correctamente');
    }
    
};

