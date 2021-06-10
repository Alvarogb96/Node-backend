const connection = require('../database');
const bcrypt = require('bcryptjs');

exports.addEmpleado = async(req, res) => {
    const sql = 'INSERT INTO usuarios SET ?';
    const password = req.body.usuario.password;
    const hashedPassword = await bcrypt.hash(password, 12);
    req.body.usuario.password = hashedPassword;
    const usuario = req.body.usuario;
    connection.query(sql, usuario, error => {
        if (error) throw error;
        res.send('Usuario añadido');
      });
}

exports.readEmpleado = (req, res) =>{
    const { id } = req.params;
    const sql = 'SELECT * FROM usuarios WHERE id_usuario =? AND role="'+process.env.ROLE_EMPLEADO+'"';
    connection.query(sql, [id] ,  (err,results)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else if(results.length > 0){
            const empleado = results[0];
            res.status(200).json({usuario: empleado});
        } else {
            res.status(404).send('Usuario no registrado en el sistema')
        }
    });
}

exports.empleados = (req,res) =>{
    const sql = 'SELECT * FROM usuarios WHERE role="'+process.env.ROLE_EMPLEADO+'"';
    connection.query(sql, (err,results)=>{
        
        if(err){
            console.log(err)
            
        } else if(results.length > 0){
            empleados = results;
            res.status(200).json({empleados});
        } else {
            res.send("No hay empleados");
        }
    });
}
