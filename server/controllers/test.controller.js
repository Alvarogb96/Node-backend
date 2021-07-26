const Test = require('../models/test.model');

exports.findAll = function (req, res) {
    if (req.body.role === process.env.ROLE_DIRECTIVO) {
        Test.findAll(function (err, tests) {
            if (err) {
                console.log(err)
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
//    if(!validation(test)){
//         res.status(400).send({ error:true, message: 'Valores incorrectos' });
    // }else{
        Test.create(test, function(err, result) {
            if (err) {
            throw err;
            } else {
                res.json({error:false,message:"Test añadido",data:result});
            }
        });
    // }
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body.test).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Test.update(req.params.id, new Test(req.body.test), function(err, test) {
            if (err)
            res.send(err);
            res.send('Test actualizado correctamente');
        });
    }
  
};
