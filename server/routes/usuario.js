const express = require('express');
const router = express.Router();
router.use(express.json());
const usuarioController = require('../controllers/usuario.controller');

//Todos los empleados
router.get('/empleados', usuarioController.findAll);

//Obtener empleado por id
router.get('/empleados/:id', usuarioController.findById);

//Añadir usuario
router.post('/addUsuario', usuarioController.create);

//Actualizar usuario
router.put('/updateUsuario/:id', usuarioController.update);

module.exports = router;



