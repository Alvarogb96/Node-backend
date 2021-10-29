const EquipoProteccionIndividual = require('../models/equipoProteccionIndividual.model');


exports.create =  function (req, res) {
    const epi = new EquipoProteccionIndividual(req.body);
    var mensaje = EquipoProteccionIndividual.validation(epi);
    if (mensaje != true) {
        res.status(400).send({ error: true, message: 'Valor incorrecto de ' + mensaje });
    } else {
        EquipoProteccionIndividual.create(epi, function (err, epi) {
            if (err) {
                res.json({error:true,err});
            } else {
                res.json({ error: false, message: "EPI añadido", data: epi });
            }
        });
    }
};

exports.findAll = function(req, res) {
    EquipoProteccionIndividual.findByIdSucursal(req.params.id, function(err, epis) {
      if(err){
        res.json({error:true,err});  
    } else if(epis.length > 0){
        res.status(200).json({epis});
    } else {
        res.status(404).send('No hay equipos de protección individual.')
    }
    });
  };


  exports.getEpisAnalisis = function (req, res) {

    EquipoProteccionIndividual.getEpisAnalisis(req.body[0],req.body[1], function (err, epis) {
        if (err) {
            res.status(500).send({ error:true, message: err });
        } else if (epis.length > 0) {
            res.status(200).json({ epis });
        } else {
            res.status(404).send('No hay equipos de protección individual.')
        }
    });

};

exports.delete = function(req, res) {
    const epi = new EquipoProteccionIndividual(req.body);
    var mensaje = EquipoProteccionIndividual.validation(epi);
    if(mensaje != true){
        res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
    } else {
        EquipoProteccionIndividual.delete(epi, function(err, epi) {
            if (err) {
                res.json({error:true,err});
                } else {
                    res.json({error:false,message:"Epi eliminado"});
                }
        });
    }

};

exports.update = function(req, res) {
const epi = new EquipoProteccionIndividual(req.body);
var mensaje = EquipoProteccionIndividual.validation(epi);
if(mensaje != true){
    res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
}else{
    EquipoProteccionIndividual.update(epi.id_epi,epi, function(err, epi) {
        if (err){
            res.json({error:true,err});
        }
        else {
            res.json({error:false,message:"Epi actualizado"})
        }
    });
}
};

exports.findAllAvailable = function (req, res) {
    EquipoProteccionIndividual.findAllAvailable(req.body[0],req.body[1], function (err, epis) {
        if (err) {
            res.json({error:true,err});
        } else if (epis.length > 0) {
            res.status(200).json({ epis });
        } else {
            res.send("No hay equipos de protección registrados en el sistema.");
        }
    });

};


