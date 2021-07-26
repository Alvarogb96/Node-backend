const express = require('express');
const router = express.Router();
router.use(express.json());
const solicitudBajaController = require('../controllers/solicitudBaja.controller');
const path = require('path');


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

//Añadir Solicitud de baja
router.post('/addSolicitudBaja', solicitudBajaController.create);

//Obtener Solicitud de baja por id
router.get('/solicitudBaja/:id', solicitudBajaController.findById);

//Obtener Solicitud de baja por id de usuario
router.get('/solicitudesBaja/:id', solicitudBajaController.findByIdEmpleado);

//Actualizar Solicitud_baja
router.put('/updateSolicitudBaja/:id', solicitudBajaController.update);

// POST File
router.post('/uploadFileBaja', upload.single('file'),solicitudBajaController.subirArchivo);


// router.get('/downloadFileBaja', function (req, res, next) {
//     var filePath = "./files/solicitudesBaja"; // Or format the path using the `id` rest param
//     var fileName = "factura-macnificos-1135464.pdf"; // The default name the browser will use

//     res.download("./files", "prueba.txt");    
// });

router.get( "/downloadFileBaja", (req, res) => {
    const file = path.resolve(`./files/solicitudesBaja/factura-macnificos-1135464.pdf`);
    //No need for special headers

    
    res.download(file); 
})


module.exports = router;