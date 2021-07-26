const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/database');
require('dotenv').config()

exports.login2 = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email !== '' && password !== '') {
    const sqlEmpleado = 'SELECT * FROM usuarios WHERE email = ?';
    const sqlDirectivo = 'SELECT * FROM directivos WHERE email = ?';
    const sqlEmpresa = 'SELECT * FROM empresa WHERE email = ?';

    connection.query(sqlEmpleado, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if (results.length == 0) {
        connection.query(sqlDirectivo, [email], async (err1, results1) => {
          if (err1) {
            return res.status(500).json({
              ok: false,
              err1
            });
          }
          console.log(results1);
          if (results1.length == 0) {
            /*return res.status(401).json({
              ok: false,
              message: 'Email o contraseña incorrectos'
            });*/
            connection.query(sqlEmpresa, [email], async (err1, results2) => {
              if (err1) {
                return res.status(500).json({
                  ok: false,
                  err1
                });
              }
              console.log(results2.length);
              if (results2.length > 0) {
                const empresa = results2[0];
                let tipo = 'empresa';
                console.log(tipo);

                const isEqual = await bcrypt.compare(password, storedUser.password);
                //const isEqual = (password == empresa.password);

                if (!isEqual) {
                  return res.status(401).json({
                    ok: false,
                    message: 'Email o contraseña incorrectos'
                  });
                }

                const token = jwt.sign(
                  {
                    email: empresa.email,
                    empresaId: empresa.idempresa,
                  },
                  process.env.JWT_KEY,
                  { expiresIn: process.env.JWT_EXPIRES_IN }
                );
                res.status(200).json({ token: token, empresaId: empresa.idempresa, tipo });
              } else {
                return res.status(401).json({
                  ok: false,
                  message: 'Email o contraseña incorrectos'
                });
              }
            });
          } else {
            const storedUser = results1[0];
            console.log("Directivo: ", storedUser);
            let tipo = 'directivo';
            console.log(tipo);

            const isEqual = await bcrypt.compare(password, storedUser.password);

            if (!isEqual) {
              return res.status(401).json({
                ok: false,
                message: 'Email o contraseña incorrectos'
              });
            }

            const token = jwt.sign(
              {
                email: storedUser.email,
                userId: storedUser.iddirectivo,
              },
              process.env.JWT_KEY,
              { expiresIn: process.env.JWT_EXPIRES_IN }
            );
            res.status(200).json({ token: token, userId: storedUser.iddirectivo, tipo });
          }
        });
      } else {
        const storedUser = results[0];
        let tipo = 'empleado';

        const isEqual = await bcrypt.compare(password, storedUser.password);

        if (!isEqual) {
          return res.status(401).json({
            ok: false,
            message: 'Email o contraseña incorrectos'
          });
        }
        const token = jwt.sign(
          {
            email: storedUser.email,
            userId: storedUser.idempleado,
          },
          process.env.JWT_KEY,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        res.status(200).json({ token: token, userId: storedUser.idempleado, tipo });
      }
    });
  }
};





exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email !== '' && email !== undefined && password !== '' && password !== undefined) {
    const queryLogin = 'SELECT * FROM usuarios WHERE email = ?';
    connection.query(queryLogin, [email], async (err, results) => {
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