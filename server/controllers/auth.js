const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/database');
require('dotenv').config()

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email !== '' && email !== undefined && password !== '' && password !== undefined) {
    const queryLoginUsuarios = 'SELECT * FROM usuarios WHERE email = ?';
    const queryLoginSucursales = 'SELECT * FROM sucursales WHERE email = ?';
    connection.query(queryLoginUsuarios, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }
      if (results.length == 0) {
        connection.query(queryLoginSucursales, [email], async (err, results) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              err
            });
          }
          if (results.length == 0) {
            return res.status(401).json({
              ok: false,
              message: 'Correo electrónico erróneo'
            });
          
        } else {
          const storedUsuario = results[0];
          const isEqual = await bcrypt.compare(password, storedUsuario.password);
          if (!isEqual) {
            return res.status(401).json({
              ok: false,
              message: 'Contraseña incorrecta'
            });
          }
          const token = jwt.sign(
            {
              email: storedUsuario.email,
              userId: storedUsuario.id_sucursal,
            },
            process.env.JWT_KEY,
            { expiresIn: process.env.JWT_EXPIRES_IN }
          );
          res.status(200).json({ token: token, userId: storedUsuario.id_sucursal, role: process.env.ROLE_EMPRESA , storedUsuario });
        }

        });

      } else {
        const storedUsuario = results[0];
        const isEqual = await bcrypt.compare(password, storedUsuario.password);
        if (!isEqual) {
          return res.status(401).json({
            ok: false,
            message: 'Contraseña incorrecta'
          });
        }
        const token = jwt.sign(
          {
            email: storedUsuario.email,
            userId: storedUsuario.id_usuario,
          },
          process.env.JWT_KEY,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        res.status(200).json({ token: token, userId: storedUsuario.id_usuario, role: storedUsuario.role, storedUsuario });
      }
    });
  } else {
    return res.status(401).json({
      ok: false,
      message: 'Email o password incorrecto'
    });
  }
};