const express = require('express');
const router = express.Router();
router.use(express.json());
const testController = require('../controllers/testController');

//Todos los noticias
router.get('/tests', testController.tests);

//Añadir test
router.post('/addTest', testController.addTest);

//Obtener test por id
router.get('/tests/:id', testController.readTest);

//Obtener test por id de usuario
router.get('/testsEmpleado/:id', testController.readTestEmpleado);

module.exports = router;