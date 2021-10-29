const express = require('express');
const router = express.Router();
router.use(express.json());
const stockMinimoController = require('../controllers/stockMinimo.controller');


//Obtener el stock minimo de epi por id de sucursal
router.get('/stockMinimoBySucursal/:id', stockMinimoController.findByIdSucursal);

//Actualizar stock minimo
router.put('/updateStockMinimo', stockMinimoController.update);

//Añadir stock minimo
router.post('/addStockMinimo', stockMinimoController.create);

//Añadir stock minimo de varios tipos de epis
router.post('/addStockEpis', stockMinimoController.createStockEpis);

module.exports = router;