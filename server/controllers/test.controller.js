const Test = require('../models/test.model');
const path = require('path');

exports.findAll = function (req, res) {
    if (req.body.role === process.env.ROLE_DIRECTIVO) {
        Test.findAll(function (err, tests) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else if (tests.length > 0) {
                res.status(200).json({ tests });
            } else {
                res.send("No hay tests registrados en el sistema");
            }
        });
    } else {
        res.status(500).send('Error permisos');
    }
};

exports.findById = function(req, res) {
    Test.findById(req.params.id, function(err, test) {
        if (err)
        return res.status(400).json({
            ok: false,
            err
        });
        if(test.length > 0){
            res.status(200).json({test: test});
        } else {
            res.status(404).send('Test no registrado en el sistema')
        }
    });
};

exports.findByIdEmpleado = function(req, res) {
    Test.findByIdEmpleado(req.params.id, function(err, tests) {
        if (err)
        return res.status(400).json({
            ok: false,
            err
        });
        if(tests.length > 0){
            res.status(200).json({tests: tests});
        } else {
            res.status(404).send('Error consulta')
        }
    });
};

exports.create = async function(req, res) {
    const test = new Test(req.body);
    var mensaje = Test.validation(test);
   if(mensaje != true){
        res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
    }else{
        Test.create(test, function(err, result) {
            if (err) {
            throw err;
            } else {
                res.json({error:false,message:"Test añadido",data:result});
            }
        });
     }
};

exports.delete = function(req, res) {
    const test = new Test(req.body);
    var mensaje = Test.validation(test);
    if(mensaje != true){
        res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
    } else {
        Test.delete(test, function(err, test) {
            if (err) {
                res.json({error:true,err});
                } else {
                    res.json({error:false,message:"Test eliminado"});
                }
        });
    }
  
};

exports.update = function(req, res) {
    const test = new Test(req.body);
    var mensaje = Test.validation(test);
    if(mensaje != true){
        res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
    }else{
        Test.update(test.id_test,test, function(err, test) {
            if (err){
                res.json({error:true,err});
            }
            else {
                res.json({error:false,message:"Test actualizado"})
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
    const file = path.resolve(`./files/tests/`+ req.params.nombreArchivo);    
    res.download(file); 
};
