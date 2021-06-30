const connection = require('../config/database');
 
var Noticia = function(noticia){
    this.titulo                = noticia.titulo;
    this.descripcion           = noticia.descripcion;
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
    const sql = 'SELECT * FROM noticias';
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};
// Usuario.update = function(id, usuario, result){
//     const sql = 'UPDATE usuarios SET ? WHERE id_usuario = ?';
//     connection.query(sql, [usuario, id], function (err, res) {
//         if(err) {
//             result(null, err);
//         }else{   
//             result(null, res);
//         }
//     }); 
// };
// Employee.delete = function(id, result){
//      dbConn.query("DELETE FROM employees WHERE id = ?", [id], function (err, res) {
//         if(err) {
//             console.log("error: ", err);
//             result(null, err);
//         }
//         else{
//             result(null, res);
//         }
//     }); 
// };


module.exports= Noticia;