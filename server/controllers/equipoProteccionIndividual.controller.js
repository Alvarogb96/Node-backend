const EquipoProteccionIndividual = require('../models/equipoProteccionIndividual.model');

exports.create = async function(req, res) {
     const epi = req.body;
//    if(!validation(noticia)){
//         res.status(400).send({ error:true, message: 'Valores incorrectos' });
//     }else{
        //if(req.body.role == process.env.ROLE_EMPRESA){
            EquipoProteccionIndividual.create(epi, function(err, epi) {
            if (err) {
            throw err;
            } else {
                res.json({error:false,message:"EPI añadido",data:epi});
            }
        });
        // } else {
        //     res.status(500).send('No tiene los permisos para registrar noticias en el sistema')
        // }
    //}
};

exports.findAll = function(req, res) {
    EquipoProteccionIndividual.findAllEpis(function(err, epis) {
      if(err){
        console.log(err)    
    } else if(epis.length > 0){
        res.status(200).json({epis});
    } else {
        res.send("No hay equipos de protección individual");
    }
    });
  };


  exports.getEpisAnalisis = function (req, res) {

    EquipoProteccionIndividual.getEpisAnalisis(function (err, epis) {
        if (err) {
            console.log(err)
        } else if (epis.length > 0) {
            res.status(200).json({ epis });
        } else {
            res.send("No hay equipos de protección individual.");
        }
    });

};