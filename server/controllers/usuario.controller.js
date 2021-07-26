const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');

exports.findAll = function(req, res) {
    Usuario.findAll(function(err, empleados) {
      if(err){
        console.log(err)    
    } else if(empleados.length > 0){
        res.status(200).json({empleados});
    } else {
        res.send("No hay empleados");
    }
    });
  };

exports.create = async function(req, res) {
    const usuario = new Usuario(req.body.usuario);
    usuario.password = await bcrypt.hash(usuario.password, 12);
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Usuario.create(usuario, function(err, usuario) {
            if (err) {
            res.status(404).send(
                'Insert error'
                
            );
            }
            res.send('Usuario añadido');
        });
    }
};

exports.findById = function(req, res) {
    Usuario.findById(req.params.id, function(err, empleado) {
        if (err)
        res.send(err);
        if(empleado.length > 0){
            res.status(200).json({empleado: empleado[0]});
        } else {
            res.status(404).send('Empleado no registrado en el sistema')
        }
    });
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body.usuario).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Usuario.update(req.params.id, new Usuario(req.body.usuario), function(err, usuario) {
            if (err)
            res.send(err);
            res.send('Usuario actualizado correctamente');
        });
    }
  
};

