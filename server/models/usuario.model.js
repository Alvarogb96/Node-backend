const connection = require('../database');

//Usuario 
var Usuario = function(usuario){
    this.nombre                = usuario.nombre;
    this.apellidos             = usuario.apellidos;
    this.nif                   = usuario.nif;
    this.fecha_nacimiento      = usuario.fecha_nacimiento;
    this.fecha_incorporacion   = usuario.fecha_incorporacion;
    this.role                  = usuario.role;
    this.email                 = usuario.email;
    this.password              = usuario.password;
};
Usuario.create = function (usuario, result) {   
    const sql = 'INSERT INTO usuarios SET ?';
    connection.query(sql, usuario, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

Usuario.findById = function (id, result) {
    const sql = 'SELECT * FROM usuarios WHERE id_usuario =? AND role="'+process.env.ROLE_EMPLEADO+'"';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Usuario.findAll = function (result) {
    const sql = 'SELECT * FROM usuarios WHERE role="'+process.env.ROLE_EMPLEADO+'"';
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};
Usuario.update = function(id, usuario, result){
    const sql = 'UPDATE usuarios SET ? WHERE id_usuario = ?';
    connection.query(sql, [usuario, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
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

module.exports= Usuario;