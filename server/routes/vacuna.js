const express = require('express');
const router = express.Router();
router.use(express.json());
const vacunaController = require('../controllers/vacuna.controller');
multer = require('multer')
const PATH = './files/vacunas';

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

//Todos las vacunas
router.get('/vacunas', vacunaController.findAll);

//Añadir vacuna
router.post('/addVacuna', vacunaController.create);

//Obtener vacuna por id
router.get('/vacunas/:id', vacunaController.findById);

//Obtener vacunas por id de usuario
router.get('/vacunasEmpleado/:id', vacunaController.findByIdEmpleado);

//Eliminar vacuna
router.put('/deleteVacuna', vacunaController.delete);

//Actualizar vacuna
router.put('/updateVacuna', vacunaController.update);

//Vacunas(análisis)
router.get('/getVacunasAnalisis/:id', vacunaController.getVacunasAnalisis);

// POST File
router.post('/uploadFileVacuna', upload.single('file'),vacunaController.subirArchivo);

router.get( "/downloadFileVacuna/:nombreArchivo", vacunaController.descargarArchivo);

module.exports = router;