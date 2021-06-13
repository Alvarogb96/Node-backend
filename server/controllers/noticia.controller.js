const Noticia = require('../models/noticia.model');

exports.create = async function(req, res) {
    const noticia = new Noticia(req.body.noticia);
   if(!validation(noticia)){
        res.status(400).send({ error:true, message: 'Valores incorrectos' });
    }else{
        if(req.body.role == process.env.ROLE_EMPRESA){
        Noticia.create(noticia, function(err, noticia) {
            if (err) {
            throw err;
            } else {
            res.send('Noticia añadida');
            }
        });
        } else {
            res.status(500).send('No tiene los permisos para registrar noticias en el sistema')
        }
    }
};

exports.findAll = function(req, res) {
    Noticia.findAll(function(err, noticias) {
    if(err){
        console.log(err)    
    } else if(noticias.length > 0){
        res.status(200).json({noticias});
    } else {
        res.send("No hay noticias registradas en el sistema");
    }
    });
};

exports.findById = function(req, res) {
    Noticia.findById(req.params.id, function(err, noticia) {
        if (err)
        res.send(err);
        if(noticia.length > 0){
            res.status(200).json({noticia: noticia});
        } else {
            res.status(404).send('Noticia no registrada en el sistema')
        }
    });
};



validation = function(noticia){
    if(noticia.titulo && noticia.titulo !== undefined && noticia.titulo !== '' &&
        noticia.descripcion && noticia.descripcion !== undefined && noticia.descripcion !== ''){
        return true;
    } else {
        return false;
    }
}
