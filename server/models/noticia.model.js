const connection = require('../config/database');
const Constantes = require('../config/constantes');
 
var Noticia = function(noticia){
    this.id_noticia            = noticia.id_noticia;
    this.id_sucursal           = noticia.id_sucursal;
    this.titulo                = noticia.titulo;
    this.descripcion           = noticia.descripcion;
    this.fecha_creacion        = noticia.fecha_creacion;
    this.fecha_actualizacion   = noticia.fecha_actualizacion;
};

Noticia.create = function (noticia, result) {   
    const sql = 'INSERT INTO noticias SET ?';
    
    connection.query(sql, noticia, function (err, res) {
        if(err) {
            console.log(err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

Noticia.findById = function (id, result) {
    const sql = 'SELECT * FROM noticias WHERE id_noticia =?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Noticia.findAll = function (result) {
    const sql = 'SELECT * FROM noticias WHERE oculto IS FALSE order by noticias.fecha_creacion DESC';
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

Noticia.findByIdSucursal = function (id, result) {
    const sql = 'SELECT * FROM noticias WHERE oculto IS FALSE AND id_sucursal = ? order by noticias.fecha_creacion DESC';
    connection.query(sql, id, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

Noticia.delete = function (noticia, result) {   
    const sql = 'UPDATE noticias SET oculto = 1 ,fecha_actualizacion = ? WHERE id_noticia= ?';
    connection.query(sql, [noticia.fecha_actualizacion, noticia.id_noticia], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    });         
};

Noticia.update = function(id,noticia, result){
    const sql = 'UPDATE noticias SET titulo = ?, descripcion = ?, fecha_actualizacion = ? WHERE id_noticia = ?';
    connection.query(sql, [noticia.titulo, noticia.descripcion, noticia.fecha_actualizacion, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

Noticia.validation = function(noticia){
    if(noticia.titulo === null || noticia.titulo === undefined || noticia.titulo === ''){
    } else if(noticia.descripcion === null || noticia.descripcion === undefined || noticia.descripcion === ''){
        return Constantes.DESCRIPCION;
    } else{
        return true;
    } 
}


module.exports= Noticia;