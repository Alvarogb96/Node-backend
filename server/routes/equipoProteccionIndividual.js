const express = require('express');
const router = express.Router();
router.use(express.json());
const equipoProteccionIndividual = require('../controllers/equipoProteccionIndividual.controller');


//Epis de una sucursal
router.get('/epis/:id', equipoProteccionIndividual.findAll);

//Añadir epi
router.post('/addEPI', equipoProteccionIndividual.create);

//Actualizar epi
router.put('/updateEPI', equipoProteccionIndividual.update);

//Eliminar epi
router.put('/deleteEPI', equipoProteccionIndividual.delete);

//Epis(análisis)
router.post('/getEpisAnalisis', equipoProteccionIndividual.getEpisAnalisis);

//Todos los epis disponibles de una sucursal
router.post('/episDisponibles', equipoProteccionIndividual.findAllAvailable);

module.exports = router;