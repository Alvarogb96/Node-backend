const express = require('express');
const app = express();
app.use(express.json());
//const router = express.Router();

const connection = require('../database');

//Todos los usuarios
app.get('/materiales', (req, res) =>{
    const sql = 'SELECT * FROM materiales';
    connection.query(sql, (err,results)=>{
        if(err){
            console.log(err)
            
        } else if(results.length > 0){
            res.json(results);
        } else {
            res.send("No hay material de protección");
        }
    });
});

app.get('/materiales/:tipo', (req, res) =>{
    connection.query('SELECT * FROM usuarios WHERE role = "empleado"', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    });
});

app.post('/addMaterial', (req, res) =>{
    const sql = 'INSERT INTO materiales SET ?';

    const materialObj = {
        tipo: req.body.tipo,
        unidades: req.body.unidades,
    };
    connection.query(sql, materialObj, error => {
        if (error){
            res.send('No se puede añadir ese material');
            //throw error;
        }else{
            res.send('Material de protección añadido');
        }
        
      });
});

module.exports = app;