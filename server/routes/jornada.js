const express = require('express');
const router = express.Router();
router.use(express.json());
const jornadaController = require('../controllers/jornada.controller');

//Añadir Jornada
router.post('/addJornada', jornadaController.create);

//Todas las jornadas
router.get('/jornadas', jornadaController.findAll);

//Obtener jornada por id de usuario
router.get('/jornadaEmpleado/:id', jornadaController.findByIdEmpleado);

//Obtener jornada por id de jornada
router.get('/jornadas/:id', jornadaController.findById);

//Actualizar Jornada por directivo
router.put('/updateJornadaByDirectivo', jornadaController.update);




module.exports = router;