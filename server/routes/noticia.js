const express = require('express');
const router = express.Router();
router.use(express.json());
const noticiaController = require('../controllers/noticia.controller');

//Todos los noticias
router.get('/noticias', noticiaController.findAll);

//Obtener noticia por id
router.get('/noticias/:id', noticiaController.findById);

//Añadir noticia
router.post('/addNoticia', noticiaController.create);

module.exports = router;