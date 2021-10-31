const bcrypt = require('bcryptjs');
const Sucursal = require('../models/sucursal.model');
const Usuario = require('../models/usuario.model');


exports.create = async function (req, res) {
    const sucursal = new Sucursal(req.body);
    sucursal.password = await bcrypt.hash(sucursal.password, 12);
    var mensaje = Sucursal.validation(sucursal);
    if (mensaje != true) {
        res.status(400).send({ error: true, message: 'Valor incorrecto de ' + mensaje });
    } else {
        Usuario.findByEmail(sucursal.email, function (err, sucursalRes) {
            if (sucursalRes.length > 0) {
                res.status(404).send({
                    error: true, message: 'El correo electrónico ya está registrado en sistema, ' +
                        'elija uno distinto.'
                });
            } else {
                Sucursal.findByEmail(sucursal.email, function (err, sucursalRes2) {
                    if (sucursalRes2.length > 0) {
                        res.status(404).send({
                            error: true, message: 'El correo electrónico ya está registrado en sistema, ' +
                                'elija uno distinto.'
                        })
                    } else {
                        Sucursal.create(sucursal, function (err, sucursal) {
                            if (err) {
                                res.json({ error: true, err });
                            } else {
                                res.json({ error: false, message: "Sucursal añadida", data: sucursal });
                            }
                        });
                    }
                });
            }
        });
    }
};

exports.findById = function(req, res) {
    Sucursal.findById(req.params.id, function(err, sucursal) {
        if (err)
        res.json({error:true,err});
        if(sucursal.length > 0){
            res.status(200).json({sucursal: sucursal[0]});
        } else {
            res.status(404).json({error:false,message:"Sucursal no registrada en el sistema"});
        }
    });
};

exports.updatePassword = async function (req, res) {
    var sucursal = req.body
    var mensaje = Sucursal.validationPassword(sucursal);
    if (mensaje != true) {
        res.status(400).send({ error: true, message: mensaje });
    } else {
        sucursal.newPassword = await bcrypt.hash(sucursal.newPassword, 12);

        Sucursal.findPasswordById(sucursal.id_sucursal, async function (err, password) {
            if (err) {
                res.json({ error: true, err });
            }
            else {
                const isEqual =  await bcrypt.compare(sucursal.password, password[0].password);
                if(isEqual){
                    Sucursal.updatePassword(sucursal.id_sucursal,sucursal, function(err, sucursal) {
                        if (err){
                            res.json({error:true,err});
                        }
                        else {
                            res.json({error:false,message:"Contraseña sucursal actualizada correctamente"})
                        }
                    });
                } else {
                    res.status(400).send({ error: true, message: 'Contraseña actual incorrecta' });
                }
            }
        });
        
    }
};

exports.findAllByIdEmpresa = function(req, res) {
    Sucursal.findByIdEmpresa(req.params.id, function(err, sucursales) {
        if (err)
        res.json({error:true,err});
        if(sucursales.length > 0){
            res.status(200).json({sucursales: sucursales});
        } else {
            res.status(404).json({error:false,message:"No hay sucursales registradas en el sistema"});
        }
    });
};