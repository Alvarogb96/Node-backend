const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../database');
require('dotenv').config()

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sqlEmpleado = 'SELECT * FROM empleados WHERE email = ?';
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

        if (results1.length == 0) {
          /*return res.status(401).json({
            ok: false,
            message: 'Email o contraseña incorrectos'
          });*/
          connection.query(sqlEmpresa, [email], (err1, results1) => {
            if (err1) {
              return res.status(500).json({
                ok: false,
                err1
              });
            }
            const empresa = results1[0];
            console.log(empresa);
            let tipo = 'empresa';
            console.log(tipo);

            //const isEqual = await bcrypt.compare(password, storedUser.password);
            const isEqual = (password == empresa.password);

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
};