const express = require('express');
const router = express.Router();
router.use(express.json());
const sucursalController = require('../controllers/sucursal.controller');

//Todos las sucursales por empresa
router.get('/sucursalesEmpresa/:id', sucursalController.findAllByIdEmpresa);

//Obtener sucursal por id
router.get('/sucursales/:id', sucursalController.findById);

//Añadir sucursal
router.post('/addSucursal', sucursalController.create);

//Actualizar contraseña del usuario
router.put('/updateSucursalPassword', sucursalController.updatePassword);

module.exports = router;