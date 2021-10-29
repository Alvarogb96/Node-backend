const Noticia = require('../models/noticia.model');

exports.create = function(req, res) {
    const noticia = new Noticia(req.body);
    var mensaje = Noticia.validation(noticia);
   if(mensaje != true){
        res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
    }else{
        Noticia.create(noticia, function(err, noticia) {
            if (err) {
                res.json({error:true,err});
            } else {
                res.json({error:false,message:"Noticia añadida",data:noticia});
            }
        });
    }
};

exports.findAll = function(req, res) {
    Noticia.findAll(function(err, noticias) {
    if(err){
        res.json({error:true,err});   
    } else if(noticias.length > 0){
        res.status(200).json({noticias});
    } else {
        res.send("No hay noticias registradas en el sistema");
    }
    });
};

exports.findByIdSucursal = function(req, res) {
    Noticia.findByIdSucursal(req.params.id, function(err, noticias) {
        if (err)
        res.json({error:true,err});
        if(noticias.length > 0){
            res.status(200).json({noticias: noticias});
        } else {
            res.status(404).send('No hay noticias registradas en el sistema')
        }
    });
};

exports.findById = function(req, res) {
    Noticia.findById(req.params.id, function(err, noticia) {
        if (err)
        res.json({error:true,err});
        if(noticia.length > 0){
            res.status(200).json({noticia: noticia});
        } else {
            res.status(404).send('Noticia no registrada en el sistema')
        }
    });
};

exports.delete = function(req, res) {
    const noticia = new Noticia(req.body);
    var mensaje = Noticia.validation(noticia);
    if(mensaje != true){
        res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
    } else {
        Noticia.delete(noticia, function(err, noticia) {
            if (err) {
                res.json({error:true,err});
                } else {
                    res.json({error:false,message:"Noticia eliminada"});
                }
        });
    }
  
};

exports.update = function(req, res) {
    const noticia = new Noticia(req.body);
    var mensaje = Noticia.validation(noticia);
    if(mensaje != true){
        res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
    }else{
        Noticia.update(noticia.id_noticia,noticia, function(err, noticia) {
            if (err){
                res.json({error:true,err});
            }
            else {
                res.json({error:false,message:"Noticia actualizada"})
            }
        });
    }
};



