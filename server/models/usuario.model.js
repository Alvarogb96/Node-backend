const connection = require('../config/database');
const Constantes = require('../config/constantes');

//Usuario 
var Usuario = function(usuario){
    this.id_usuario            = usuario.id_usuario;
    this.id_sucursal           = usuario.id_sucursal;
    this.nombre                = usuario.nombre;
    this.apellido1             = usuario.apellido1;
    this.apellido2             = usuario.apellido2;
    this.nif                   = usuario.nif;
    this.fecha_nacimiento      = usuario.fecha_nacimiento;
    this.fecha_creacion        = usuario.fecha_creacion;
    this.role                  = usuario.role;
    this.email                 = usuario.email;
    this.password              = usuario.password;
    this.fecha_actualizacion   = usuario.fecha_actualizacion;
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
    const sql = 'SELECT usuarios.role, usuarios.id_usuario, usuarios.nombre,usuarios.apellido1, usuarios.apellido2,usuarios.nif, ' +
    'usuarios.role, usuarios.email, usuarios.fecha_creacion, usuarios.fecha_actualizacion, usuarios.fecha_nacimiento, ' +
    'usuarios.id_sucursal, sucursales.nombre as nombreSucursal, sucursales.direccion, jornadas.hora_inicio, jornadas.hora_fin, jornadas.horas_semanales, empresas.id_empresa FROM usuarios INNER JOIN sucursales on usuarios.id_sucursal = sucursales.id_sucursal ' + 
    'INNER JOIN empresas on sucursales.id_empresa = empresas.id_empresa  LEFT JOIN jornadas on usuarios.id_usuario = jornadas.id_empleado WHERE id_usuario =?';
    connection.query(sql, id, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Usuario.findPasswordById = function (id, result) {
    const sql = 'SELECT password FROM usuarios WHERE id_usuario =?';
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
    const sql = 'SELECT * FROM usuarios WHERE role="'+process.env.ROLE_EMPLEADO+'" order by fecha_creacion DESC';
    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

Usuario.findByParameters = function (parameters, result) {
    var sql = 'SELECT usuarios.role, usuarios.id_usuario, usuarios.nombre,usuarios.apellido1, usuarios.apellido2,usuarios.nif, ' +
    'usuarios.role, usuarios.email, usuarios.fecha_creacion, usuarios.fecha_actualizacion, usuarios.fecha_nacimiento, ' +
    'usuarios.id_sucursal, jornadas.id_jornada, jornadas.hora_inicio, jornadas.hora_fin, jornadas.horas_semanales FROM usuarios INNER JOIN sucursales on usuarios.id_sucursal = sucursales.id_sucursal ' +
    'INNER JOIN empresas on sucursales.id_empresa = empresas.id_empresa LEFT JOIN jornadas on usuarios.id_usuario = jornadas.id_empleado ';

    if(parameters.idPropio !== null){
        sql +=('WHERE usuarios.id_usuario != ' + parameters.idPropio + ' ');
    }
    if(parameters.empresa !== null){
        sql +=('AND empresas.id_empresa = ' + parameters.empresa + ' ');
        if(parameters.sucursal !== null){
            sql +=('AND sucursales.id_sucursal = ' + parameters.sucursal + ' ');
        } 
    } else if(parameters.sucursal !== null){
        sql +=('AND sucursales.id_sucursal = ' + parameters.sucursal + ' ');
    }
     sql +=('order by usuarios.fecha_creacion desc');

    connection.query(sql, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

Usuario.findEmails = function (id_sucursal, result) {
    const sql = 'SELECT email FROM usuarios where usuarios.id_sucursal = ?';
    connection.query(sql, id_sucursal, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};


Usuario.update = function(id, usuario, result){
    const sql = 'UPDATE usuarios SET nombre = ?, apellido1 = ?, apellido2 = ?, nif = ?, role = ?, '+
     'fecha_actualizacion = ?, fecha_nacimiento = ? WHERE id_usuario = ?';
    connection.query(sql, [usuario.nombre,usuario.apellido1, usuario.apellido2,
        usuario.nif, usuario.role, usuario.fecha_actualizacion, usuario.fecha_nacimiento, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

Usuario.updateByDirectivo = function(id, usuario, result){
    const sql = 'UPDATE usuarios SET email = ?, role = ?, fecha_actualizacion = ? WHERE id_usuario = ?';
    connection.query(sql, [usuario.email,usuario.role, usuario.fecha_actualizacion, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

Usuario.delete = function (id, result) {   
    const sql = 'UPDATE usuarios SET oculto = 1 WHERE id_usuario = ?';
    connection.query(sql, id, function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    });         
};

Usuario.findByEmail = function(email, result){
    const sql = 'SELECT * FROM usuarios WHERE email =?';
    connection.query(sql, email, function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });  
}

Usuario.updatePassword = function(id, usuario, result){
    const sql = 'UPDATE usuarios SET password = ?, fecha_actualizacion = ? WHERE id_usuario = ?';
    connection.query(sql, [usuario.newPassword, usuario.fecha_actualizacion, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

Usuario.validation = function(usuario){
    if(usuario.nombre === null || usuario.nombre === undefined || usuario.nombre === '' || usuario.nombre.length > 40){
        return Constantes.NOMBRE;
    } else if(usuario.apellido1 === null || usuario.apellido1 === undefined || usuario.apellido1 === '' || usuario.apellido1.length > 40){
        return Constantes.APELLIDO1;
    } else if(usuario.apellido2 === null || usuario.apellido2 === undefined || usuario.apellido2 === '' || usuario.apellido2.length > 40){
        return Constantes.APELLIDO2;
    } else if(usuario.nif === null || usuario.nif === undefined || usuario.nif === '' || usuario.nif.length > 9){
        return Constantes.NIF;
    } else if(usuario.role === null || usuario.role === undefined || usuario.role === ''){
        return Constantes.ROLE;
    } else if(usuario.email === null || usuario.email === undefined || usuario.email === '' || usuario.email.length > 100){
        return Constantes.EMAIL;
    } else{
        return true;
    } 
}

Usuario.validationUpdateDirectivo = function(usuario){
    if(usuario.role === null || usuario.role === undefined || usuario.role === ''){
        return Constantes.ROLE;
    } else if(usuario.email === null || usuario.email === undefined || usuario.email === '' || usuario.email.length > 100){
        return Constantes.EMAIL;
    } else{
        return true;
    } 
}

Usuario.validationPassword = function(usuario){
    if(usuario.password === null || usuario.password === undefined || usuario.password === ''|| usuario.password.length > 100){
        return Constantes.CAMPO_OBLIGATORIO;
    } else if(usuario.newPassword === null || usuario.newPassword === undefined || usuario.newPassword === ''|| usuario.newPassword.length > 100){
        return Constantes.CAMPO_OBLIGATORIO;
    } else if(usuario.newPassword2 === null || usuario.newPassword2 === undefined || usuario.newPassword2 === ''|| usuario.newPassword2.length > 100){
        return Constantes.CAMPO_OBLIGATORIO;
    } else {
        return true;
    } 
}

module.exports= Usuario;