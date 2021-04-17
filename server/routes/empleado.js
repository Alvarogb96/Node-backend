const express = require('express');
const app = express();
app.use(express.json());
//const router = express.Router();

const bcrypt = require('bcryptjs');
const connection = require('../database');

//Todos los usuarios

app.get('/empleados', (req, res) =>{
    const sql = 'SELECT * FROM empleados';
    connection.query(sql, (err,results)=>{
        if(err){
            console.log(err)
            
        } else if(results.length > 0){
            res.json(results);
        } else {
            res.send("No hay empleados");
        }
    });
});

app.get('/empleados/:id', (req, res) =>{
    const { id } = req.params;
    const sql = 'SELECT * FROM empleados WHERE idEmpleado =?';
    connection.query(sql, [id] ,  (err,results)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else if(results.length > 0){
            const empleado = results[0];
            res.status(200).json({empleado: empleado});
            //res.json({empleado: results[0], ok:true});
        } else {
            res.send("No está ese empleado");
        }
    });
});

app.post('/addEmpleado', async(req, res) =>{
    const sql = 'INSERT INTO empleados SET ?';

    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);
    const empleadoObJ = {
        email: req.body.email,
        password: hashedPassword,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        estadoSalud: req.body.estadoSalud,
        salario: req.body.salario,
    };
    connection.query(sql, empleadoObJ, error => {
        if (error) throw error;
        res.send('Empleado añadido');
      });
});


module.exports = app;



