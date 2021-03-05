const express = require('express');
const app = express();
app.use(express.json());
//const router = express.Router();

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

app.post('/addEmpleado', (req, res) =>{
    const sql = 'INSERT INTO empleados SET ?';

    const empleadoObJ = {
        email: req.body.email,
        password: req.body.password,
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



//Add usuarios

module.exports = app;

