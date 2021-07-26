const express = require('express');
const router = express.Router();
router.use(express.json());
const solicitudEpiController = require('../controllers/solicitudEpi.controller');


//Todos las solicitudes de material
router.get('/solicitudesEpi', solicitudEpiController.findAll);

//Obtener Solicitud de epi por id
router.get('/solicitudesEpi/:id', solicitudEpiController.findById);

//Obtener Solicitud de epi por id de empleado
router.get('/solicitudesEpiEmpleado/:id', solicitudEpiController.findByIdEmpleado);


//Añadir Solicitud de epi
router.post('/addSolicitudEpi', solicitudEpiController.create);

//Actualizar Solicitud de epi
router.put('/updateSolicitudEpi', solicitudEpiController.update);

//Todos los epis disponibles
router.get('/episDisponibles', solicitudEpiController.findAllAvailable);




module.exports = router;