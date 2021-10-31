const express = require('express');
const router = express.Router();
router.use(express.json());
const noticiaController = require('../controllers/noticia.controller');

//Todos los noticias
router.get('/noticias', noticiaController.findAll);

//Obtener noticia por id de sucursal
router.get('/noticiasBySucursal/:id', noticiaController.findByIdSucursal);

//Obtener noticia por id
router.get('/noticias/:id', noticiaController.findById);

//Eliminar noticia
router.put('/deleteNoticia', noticiaController.delete);

//Actualizar noticia
router.put('/updateNoticia', noticiaController.update);

//Añadir noticia
router.post('/addNoticia', noticiaController.create);

module.exports = router;