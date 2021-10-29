const express = require('express');
const router = express.Router();
router.use(express.json());
const solicitudBajaController = require('../controllers/solicitudBaja.controller');
multer = require('multer')
const PATH = './files/solicitudesBaja';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

let upload = multer({
  storage: storage
});



//Todos las solicitudes de baja
router.get('/solicitudesBaja', solicitudBajaController.findAll);

//Todos las solicitudes de baja(Con filtros de busqueda)
router.post('/solicitudesBajaByParameters', solicitudBajaController.findByParameters);

//Añadir Solicitud de baja
router.post('/addSolicitudBaja', solicitudBajaController.create);

//Obtener Solicitud de baja por id
router.get('/solicitudBaja/:id', solicitudBajaController.findById);

//Obtener Solicitud de baja por id de usuario
router.get('/solicitudesBaja/:id', solicitudBajaController.findByIdEmpleado);

//Actualizar Solicitud_baja
router.put('/updateSolicitudBaja', solicitudBajaController.update);

// POST File
router.post('/uploadFileBaja', upload.single('file'),solicitudBajaController.subirArchivo);


router.get( "/downloadFileBaja/:nombreArchivo", solicitudBajaController.descargarArchivo);

//Solicitudes de baja(análisis)
router.get('/getBajasAnalisis/', solicitudBajaController.getBajasAnalisis);


module.exports = router;