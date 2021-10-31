const connection = require('../config/database');
const Constantes = require('../config/constantes');

//Sucursal 
var Sucursal = function(sucursal){
    this.id_sucursal           = sucursal.id_sucursal;
    this.id_empresa            = sucursal.id_empresa;
    this.nombre                = sucursal.nombre;
    this.direccion             = sucursal.direccion;
    this.nif                   = sucursal.nif;
    this.fecha_creacion        = sucursal.fecha_creacion;
    this.email                 = sucursal.email;
    this.password              = sucursal.password;
    this.fecha_actualizacion   = sucursal.fecha_actualizacion;
};

Sucursal.create = function (sucursal, result) {   
    const sql = 'INSERT INTO sucursales SET ?';
    connection.query(sql, sucursal, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

Sucursal.findByEmail = function(email, result){
    const sql = 'SELECT * FROM sucursales WHERE email =?';
    connection.query(sql, email, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });  
}

Sucursal.findById = function (id, result) {
    const sql = 'SELECT *, ' +
    '(select count(*) from usuarios where usuarios.id_sucursal = ? and usuarios.role = "E") as empleados, ' + 
    '(select count(*) from usuarios where usuarios.id_sucursal = ? and usuarios.role = "D") as directivos ' +
    'FROM sucursales WHERE id_sucursal =?';
    connection.query(sql, [id,id,id], function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Sucursal.findByIdEmpresa = function (id, result) {
    const sql = 'SELECT sucursales.id_sucursal, sucursales.nombre FROM sucursales WHERE id_empresa =?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Sucursal.findPasswordById = function (id, result) {
    const sql = 'SELECT password FROM sucursales WHERE id_sucursal =?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Sucursal.updatePassword = function(id, sucursal, result){
    const sql = 'UPDATE sucursales SET password = ?, fecha_actualizacion = ? WHERE id_sucursal = ?';
    connection.query(sql, [sucursal.newPassword, sucursal.fecha_actualizacion, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};


Sucursal.validation = function(sucursal){
    if(sucursal.nombre === null || sucursal.nombre === undefined || sucursal.nombre === ''){
        return Constantes.NOMBRE;
    } else if(sucursal.direccion === null || sucursal.direccion === undefined || sucursal.direccion === ''){
        return Constantes.DIRECCION;
    } else if(sucursal.nif === null || sucursal.nif === undefined || sucursal.nif === ''){
        return Constantes.NIF;
    } else if(sucursal.email === null || sucursal.email === undefined || sucursal.email === ''){
        return Constantes.EMAIL;
    } else if(sucursal.password === null || sucursal.password === undefined || sucursal.password === ''){
        return Constantes.PASSWORD;
    } else{
        return true;
    } 
}

Sucursal.validationPassword = function(sucursal){
    if(sucursal.password === null || sucursal.password === undefined || sucursal.password === ''){
        return Constantes.CAMPO_OBLIGATORIO;
    } else if(sucursal.newPassword === null || sucursal.newPassword === undefined || sucursal.newPassword === ''){
        return Constantes.CAMPO_OBLIGATORIO;
    } else if(sucursal.newPassword2 === null || sucursal.newPassword2 === undefined || sucursal.newPassword2 === ''){
        return Constantes.CAMPO_OBLIGATORIO;
    } else {
        return true;
    } 
}


module.exports= Sucursal;