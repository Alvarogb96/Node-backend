const express = require('express');
const router = express.Router();
router.use(express.json());
const usuarioController = require('../controllers/usuarioController');

//Todos los empleados
router.get('/empleados', usuarioController.empleados);

//Obtener empleado por id
router.get('/empleados/:id', usuarioController.readEmpleado);

//Añadir empleado
router.post('/addEmpleado', usuarioController.addEmpleado);


module.exports = router;



