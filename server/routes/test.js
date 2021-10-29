const express = require('express');
const router = express.Router();
router.use(express.json());
const testController = require('../controllers/test.controller');
multer = require('multer')
const PATH = './files/tests';

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

//Todos los test
router.get('/tests', testController.findAll);

//Añadir test
router.post('/addTest', testController.create);

//Obtener test por id
router.get('/tests/:id', testController.findById);

//Obtener test por id de usuario
router.get('/testsEmpleado/:id', testController.findByIdEmpleado);

//Eliminar test
router.put('/deleteTest', testController.delete);

//Actualizar noticia
router.put('/updateTest', testController.update);

// POST File
router.post('/uploadFileTest', upload.single('file'),testController.subirArchivo);

router.get( "/downloadTest/:nombreArchivo", testController.descargarArchivo);

module.exports = router;