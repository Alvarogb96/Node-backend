const express = require('express');
const router = express.Router();
router.use(express.json());
const equipoProteccionIndividual = require('../controllers/equipoProteccionIndividual.controller');

//Todos los epis
router.get('/epis', equipoProteccionIndividual.findAll);

//Añadir epi
router.post('/addEPI', equipoProteccionIndividual.create);

//Epis(análisis)
router.get('/getEpisAnalisis/', equipoProteccionIndividual.getEpisAnalisis);

module.exports = router;