const express = require('express');
const router = express.Router();
router.use(express.json());
const solicitudEpiController = require('../controllers/solicitudEpi.controller');


//Todos las solicitudes de material
router.get('/solicitudesEpi', solicitudEpiController.findAll);

//Todos las solicitudes de material(Con filtros de busqueda)
router.post('/solicitudesEpiByParameters', solicitudEpiController.findByParameters);

//Obtener Solicitud de epi por id
router.get('/solicitudesEpi/:id', solicitudEpiController.findById);

//Obtener Solicitud de epi por id de empleado
router.get('/solicitudesEpiEmpleado/:id', solicitudEpiController.findByIdEmpleado);

//Obtener materiales de una solicitud de epi por id
router.get('/materialesSolicitud/:id', solicitudEpiController.findByIdSolicitudMateriales);

//Añadir Solicitud de epi
router.post('/addSolicitudEpi', solicitudEpiController.create);

//Actualizar Solicitud de epi
router.put('/updateSolicitudEpi', solicitudEpiController.update);

//Solicitudes de epi(análisis)
router.get('/getSolicitudesAprobadas/', solicitudEpiController.getSolicitudesAprobadas);




module.exports = router;