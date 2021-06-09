const express = require('express');
const router = express.Router();
router.use(express.json());
const noticiaController = require('../controllers/noticiaController');

//Todos los noticias
router.get('/noticias', noticiaController.noticias);

//Obtener noticia por id
router.get('/noticias/:id', noticiaController.readNoticia);

//Añadir noticia
router.post('/addNoticia', noticiaController.addNoticia);

module.exports = router;