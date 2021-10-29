const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const Jornada = require('../models/jornada.model')

exports.findAll = function(req, res) {
    Usuario.findAll(function(err, empleados) {
      if(err){
        res.json({error:true,err});
    } else if(empleados.length > 0){
        res.status(200).json({empleados});
    } else {
        res.send("No hay empleados");
    }
    });
  };

  exports.findByParameters = function (req, res) {
    Usuario.findByParameters(req.body,function (err, usuarios) {
        if (err) {
            res.json({error:true,err});
        } else if (usuarios.length > 0) {
            res.status(200).json({ empleados: usuarios });
        } else {
            res.status(404).send('Error en la consulta de usuarios con esos parámetros')
        }
    });
};


exports.findEmails = function (req, res) {
    var id_sucursal = req.params.sucursal;
    if (id_sucursal != null && id_sucursal != undefined && id_sucursal != '') {
        Usuario.findEmails(req.params.sucursal, function (err, emails) {
            if (err) {
                res.json({ error: true, err });
            } else if (emails.length > 0) {
                res.status(200).json({ emails });
            } else {
                res.send("No hay emails registrados");
            }
        });
    } else {
        res.status(404).send('Error en la consulta de emails')
    }
};

exports.create = async function(req, res) {
    const usuario = new Usuario(req.body.usuario);
    var jornada = new Jornada(req.body.jornada);
    usuario.password = await bcrypt.hash(usuario.password, 12);
    var mensaje = Usuario.validation(usuario);
    if(mensaje != true){
         res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
     }else{
        Usuario.findByEmail(usuario.email, function(err, empleado){
            if(empleado.length > 0){
                res.status(404).send({ error:true, message: 'El correo electrónico ya está registrado en sistema, ' +  
                'elija uno distinto.' })
            } else {
                Usuario.create(usuario, function(err, usuario) {
                    if (err) {
                        res.json({error:true,err});
                    } else {     
                        jornada.id_empleado = usuario.insertId;
                        Jornada.create(jornada, function(err, jornada){
                            if (err) {
                                res.json({error:true,err});
                            } else {
                                res.json({error:false,message:"Usuario añadido",data:usuario});
                            }
                        });
                    }
                });
            }
        });
    }
};

exports.findById = function(req, res) {
    Usuario.findById(req.params.id, function(err, empleado) {
        if (err)
        res.json({error:true,err});
        if(empleado.length > 0){
            res.status(200).json({empleado: empleado[0]});
        } else {
            res.status(404).json({error:false,message:"Empleado no registrado en el sistema"});
        }
    });
};

exports.delete = function(req, res) {
    Usuario.delete(req.params.id, function(err, usuario) {
        if (err) {
            res.json({error:true,err});
            } else {
                res.json({error:false,message:"Usuario eliminado"});
            }
    });


};

exports.update = function(req, res) {
const usuario = new Usuario(req.body);
var mensaje = Usuario.validation(usuario);
if(mensaje != true){
    res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
}else{
    Usuario.update(usuario.id_usuario,usuario, function(err, usuario) {
        if (err){
            res.json({error:true,err});
        }
        else {
            res.json({error:false,message:"Usuario actualizado"})
        }
    });
}
};

exports.updateByDirectivo = function(req, res) {
    const usuario = new Usuario(req.body[0]);
    var mensaje = Usuario.validationUpdateDirectivo(usuario);
    if(mensaje != true){
        res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
    }else{
        if(req.body[1] === true){
            Usuario.findByEmail(usuario.email ,function(err, empleado){
                if(empleado.length > 0){
                    res.status(404).send({ error:true, message: 'El correo electrónico ya está registrado en sistema, ' +  
                    'elija uno distinto.' })
                } else {
                Usuario.updateByDirectivo(usuario.id_usuario,usuario, function(err, usuario) {
                    if (err){
                        res.status(500).send({error:true,err});
                    }
                    else {
                        res.json({error:false,message:"Usuario actualizado"})
                    }
                });
            }
        }); 
        } else {
            Usuario.updateByDirectivo(usuario.id_usuario,usuario, function(err, usuario) {
                if (err){
                    res.status(500).send({error:true,err});
                }
                else {
                    res.json({error:false,message:"Usuario actualizado"})
                }
            });
        }
    }
};

exports.updatePassword = async function (req, res) {
    var usuario = req.body
    var mensaje = Usuario.validationPassword(usuario);
    if (mensaje != true) {
        res.status(400).send({ error: true, message: mensaje });
    } else {
        usuario.newPassword = await bcrypt.hash(usuario.newPassword, 12);

        Usuario.findPasswordById(usuario.id_usuario, async function (err, password) {
            if (err) {
                res.json({ error: true, err });
            }
            else {
                const isEqual =  await bcrypt.compare(usuario.password, password[0].password);
                if(isEqual){
                    Usuario.updatePassword(usuario.id_usuario,usuario, function(err, usuario) {
                        if (err){
                            res.json({error:true,err});
                        }
                        else {
                            res.json({error:false,message:"Contraseña usuario actualizada correctamente"})
                        }
                    });
                } else {
                    res.status(400).send({ error: true, message: 'Contraseña actual incorrecta' });
                }
            }
        });
        
    }
};
