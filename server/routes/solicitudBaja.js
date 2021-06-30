const express = require('express');
const router = express.Router();
router.use(express.json());
const solicitudBajaController = require('../controllers/solicitudBaja.controller');


//Todos las solicitudes de baja
router.get('/solicitudesBaja', solicitudBajaController.findAll);

//Añadir Solicitud de baja
router.post('/addSolicitudBaja', solicitudBajaController.create);

//Obtener Solicitud de baja por id
router.get('/solicitudBaja/:id', solicitudBajaController.findById);

//Obtener Solicitud de baja por id de usuario
router.get('/solicitudesBaja/:id', solicitudBajaController.findByIdEmpleado);

//Actualizar Solicitud_baja
router.put('/updateSolicitudBaja/:id', solicitudBajaController.update);

module.exports = router;