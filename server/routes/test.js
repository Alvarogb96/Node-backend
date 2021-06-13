const express = require('express');
const router = express.Router();
router.use(express.json());
const testController = require('../controllers/test.controller');

//Todos los noticias
router.get('/tests', testController.findAll);

//Añadir test
router.post('/addTest', testController.create);

//Obtener test por id
router.get('/tests/:id', testController.findById);

//Obtener test por id de usuario
router.get('/testsEmpleado/:id', testController.findByIdEmpleado);

//Actualizar test
router.put('/updateTest/:id', testController.update);

module.exports = router;