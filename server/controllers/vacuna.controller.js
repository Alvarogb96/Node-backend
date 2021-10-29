const Vacuna = require('../models/vacuna.model');
const path = require('path');

exports.findAll = function (req, res) {
        Vacuna.findAll(function (err, vacunas) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else if (vacunas.length > 0) {
                res.status(200).json({ vacunas });
            } else {
                res.send("No hay vacunas registrados en el sistema");
            }
        });
};

exports.findById = function(req, res) {
    Vacuna.findById(req.params.id, function(err, vacuna) {
        if (err)
        return res.status(400).json({
            ok: false,
            err
        });
        if(vacuna.length > 0){
            res.status(200).json({vacuna: vacuna});
        } else {
            res.status(404).send('Vacuna no registrada en el sistema')
        }
    });
};

exports.findByIdEmpleado = function(req, res) {
    Vacuna.findByIdEmpleado(req.params.id, function(err, vacunas) {
        if (err)
        return res.status(400).json({
            ok: false,
            err
        });
        if(vacunas.length > 0){
            res.status(200).json({vacunas: vacunas});
        } else {
            res.status(404).send('Error consulta')
        }
    });
};

exports.create = async function(req, res) {
    const vacuna = new Vacuna(req.body);
    var mensaje = Vacuna.validation(vacuna);
   if(mensaje != true){
        res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
    }else{
        Vacuna.create(vacuna, function(err, result) {
            if (err) {
            throw err;
            } else {
                res.json({error:false,message:"Vacuna añadida",data:result});
            }
        });
     }
};

exports.update = function(req, res) {
        Vacuna.update(req.params.id, new Vacuna(req.body), function(err, vacuna) {
            if (err)
            res.send(err);
            res.send('Vacuna actualizada correctamente');
        });
};

exports.delete = function(req, res) {
    const vacuna = new Vacuna(req.body);
    var mensaje = Vacuna.validation(vacuna);
    if(mensaje != true){
        res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
    } else {
        Vacuna.delete(vacuna, function(err, vacuna) {
            if (err) {
                res.json({error:true,err});
                } else {
                    res.json({error:false,message:"Vacuna eliminada"});
                }
        });
    }
  
};

exports.update = function(req, res) {
    const vacuna = new Vacuna(req.body);
    var mensaje = Vacuna.validation(vacuna);
    if(mensaje != true){
        res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
    }else{
        Vacuna.update(vacuna.id_vacuna,vacuna, function(err, vacuna) {
            if (err){
                res.json({error:true,err});
            }
            else {
                res.json({error:false,message:"Vacuna actualizada"})
            }
        });
    }
};

exports.subirArchivo = function(req,res){
    if (!req.file) {
        return res.send({
          success: false
        });
    
      } else {
        return res.send({
          success: true
        })
      }
};

exports.descargarArchivo = function(req,res){
    const file = path.resolve(`./files/vacunas/`+ req.params.nombreArchivo);    
    res.download(file); 
};

exports.getVacunasAnalisis = function (req, res) {
    Vacuna.analisis(req.params.id, function (err, vacunas) {
        if (err) {
            res.status(500).send({ error:true, message: err });
        } else if (vacunas.length > 0) {
            res.status(200).json({ vacunas });
        } else {
            res.status(404).send('No hay información')
        }
    });

};