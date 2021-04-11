const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());

dotenv.config({ path: './.env'});


const connection = require('../database');

app.post('/login', async (req, res) => {
try {
    const {email, password } = req.body;

    const sqlEmpleado = 'SELECT * FROM empleados WHERE email = ?';
    const sqlDirectivo = 'SELECT * FROM directivos WHERE email = ?'
    
    /*
    if(!email || !password){
        res.send("Por favor escribe email o contraseña");
    }*/
    //const sql = 'SELECT * FROM empleados WHERE email = ?';
    connection.query(sqlEmpleado, [email], async(err1, results1) => {
        
        if (err1) {
            /*
            return res.status(500).json({
                ok: false,
                err
            });*/
            console.log(err1);
        }
        if(!results1[0]){
            //res.send('Email incorrecto');
            /*return res.status(401).json({
                ok: false,
                message: 'Usuario o contraseña incorrectos'
            });*/
            connection.query(sqlDirectivo, [email], async(err2, results2) => {
                if(!results2[0]){
                    res.send('Email incorrecto');
                } else if(await password == "" || password != results2[0].password){
                    res.send('Contraseña incorrecta');
                } else {
                    let directivo = results2[0];

                    const token =  jwt.sign({ directivo }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES_IN }); 

                    console.log("El token es: " + token);
                    //res.send('Directivo encontrado');
                    res.send(directivo);
                }
            });
        }else if(await password == "" || password != results1[0].password){
            res.send('Contraseña incorrecta');
            /*
            res.status(401).json({
                ok: false,
                message: 'Usuario o contraseña incorrectos'
            });*/
        } else {
            //const id = results[0].id;
            let empleado = results1[0];

            const token =  jwt.sign({ empleado }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES_IN }); 

            console.log("El token es: " + token);
            res.send('Empleado encontrado');


        }
    }); 
    
} catch (error) {
    console.log(error);
}

});

module.exports = app;