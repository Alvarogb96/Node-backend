const express = require('express');
const router = express.Router();
router.use(express.json());
const tipoTestController = require('../controllers/tipoTest.controller');


//Todos los tipos de tests
router.get('/tiposTest', tipoTestController.findAll);

//Obtener tipo de test por id
router.get('/tiposTest/:id', tipoTestController.findById);

//Añadir tipo de test
router.post('/addTipoTest', tipoTestController.create);


module.exports = router;