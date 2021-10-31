const express = require('express');
const router = express.Router();
router.use(express.json());
const usuarioController = require('../controllers/usuario.controller');

//Todos los empleados
router.get('/empleados', usuarioController.findAll);

//Obtener empleado por sucursal
router.post('/empleadosSucursal', usuarioController.findByParameters);

//Obtener empleado por id
router.get('/empleados/:id', usuarioController.findById);

//Añadir usuario
router.post('/addUsuario', usuarioController.create);

//Actualizar usuario
router.put('/updateUsuario', usuarioController.update);

//Actualizar usuario por directivo
router.put('/updateUsuarioByDirectivo', usuarioController.updateByDirectivo);

//Actualizar contraseña del usuario
router.put('/updateUsuarioPassword', usuarioController.updatePassword);

//Todos los emails de empleados
router.get('/emailsEmpleados/:sucursal', usuarioController.findEmails);

module.exports = router;



