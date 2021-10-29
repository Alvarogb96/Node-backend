const express = require('express');
const router = express.Router();
router.use(express.json());
const tipoVacunaController = require('../controllers/tipoVacuna.controller');


//Todos los tipos de vacunas
router.get('/tiposVacuna', tipoVacunaController.findAll);

//Obtener tipo de vacuna por id
router.get('/tiposVacuna/:id', tipoVacunaController.findById);

//Añadir tipo de vacuna
router.post('/addTipoVacuna', tipoVacunaController.create);


module.exports = router;