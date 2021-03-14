//const { validationResult } = require('express-validator');

//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../database');

const Empleado = require('../models/empleado');
/*
exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const userDetails = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    const result = await User.save(userDetails);

    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};*/

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  try {
    //const empleado = await Empleado.find(email);
    const sqlEmpleado = 'SELECT * FROM empleados WHERE email = ?';
    const sqlDirectivo = 'SELECT * FROM directivos WHERE email = ?';

    connection.query(sqlEmpleado, [email], async(err, results, fields) => {

    if (results.length == 0) {
      //pruebo si es directivo
      connection.query(sqlDirectivo, [email], async(err, results1, fields) => {
        if (!results1[0]) {
          return res.status(401).json({
            ok: false,
            message: 'Usuario o contraseña incorrectos'
        });
        }

        const storedUser = results1[0];
        console.log("Directivo: ", storedUser);
        let tipo = 'directivo';
        console.log(tipo);

        const isEqual = storedUser.password == password;

        if (!isEqual) {
          const error = new Error('Wrong password!');
          error.statusCode = 401;
          throw error;
        }

        const token = jwt.sign(
          {
            email: storedUser.email,
            userId: storedUser.iddirectivo,
          },
          'secretfortoken',
          { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: storedUser.iddirectivo, tipo });

      });
    } else {
    const storedUser = results[0];
    let tipo = 'empleado';

    //const isEqual = await bcrypt.compare(password, storedUser.password);
    const isEqual = storedUser.password == password;

    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.idempleado,
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: storedUser.idempleado, tipo });
  }
}); 
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};