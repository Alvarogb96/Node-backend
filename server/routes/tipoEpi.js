const express = require('express');
const router = express.Router();
router.use(express.json());
const tipoEpiController = require('../controllers/tipoEpi.controller');


//Todos los tipos de epi
router.get('/tiposEpi', tipoEpiController.findAll);

//Obtener tipo de epi por id
router.get('/tiposEpi/:id', tipoEpiController.findById);

//Añadir tipo de epi
router.post('/addTipoEpi', tipoEpiController.create);


module.exports = router;