const express = require('express');
const app = express();
app.use(express.json());

const connection = require('../database');

app.get('/tests', (req, res) =>{
    const sql = 'SELECT * FROM tests'
    connection.query(sql, (err,results)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else if(results.length > 0){
            res.json(results);
            //res.json({empleado: results[0], ok:true});
        } else {
            res.send("No hay test");
        }
    });
});

app.get('/test/:idtest', (req, res) =>{
    const { idtest } = req.params;
    const sql = 'SELECT * FROM tests WHERE idtest = ?'
    connection.query(sql, [idtest], (err,results)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else if(results.length > 0){
            res.json(results);
            //res.json({empleado: results[0], ok:true});
        } else {
            res.send("No hay test con ese id");
        }
    });
});

app.get('/tests/:idempleado', (req, res) =>{
    const { idempleado } = req.params;
    const sql = 'SELECT * FROM tests WHERE idempleado = ?'
    connection.query(sql, [idempleado], (err,results)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else if(results.length > 0){
            res.json(results);
            //res.json({empleado: results[0], ok:true});
        } else {
            res.status(200).json({
                ok: false,
                message: 'El empleado no tiene test'
              });
        }
    });
});

app.post('/addTest', (req, res) =>{
    const sql = 'INSERT INTO tests SET ?';

    const testObJ = {
        idempleado: req.body.idempleado,
        tipo: req.body.tipo,
        resultado: req.body.resultado,
        fecha: req.body.fecha,
    };
    connection.query(sql, testObJ, error => {
        if (error) throw error;
        res.send('test añadido');
      });
});

module.exports = app;