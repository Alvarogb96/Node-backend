const connection = require('../config/database');
const Constantes = require('../config/constantes');
 
var StockMinimo = function(stockMinimo){
    this.idsucursales_stock_epi            = stockMinimo.idsucursales_stock_epi;
    this.id_sucursal           = stockMinimo.id_sucursal;
    this.id_tipo_epi           = stockMinimo.id_tipo_epi;
    this.fecha_creacion        = stockMinimo.fecha_creacion;
    this.fecha_actualizacion   = stockMinimo.fecha_actualizacion;
    this.minimo                = stockMinimo.minimo;
};

StockMinimo.create = function (stockMinimo, result) {   
    const sql = 'INSERT INTO sucursales_stock_epi SET ?';
    
    connection.query(sql, stockMinimo, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

StockMinimo.findByIdSucursal = function (id, result) {
    const sql = 'SELECT * FROM sucursales_stock_epi WHERE oculto IS FALSE AND id_sucursal = ?';
    connection.query(sql, id, function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

StockMinimo.delete = function (stockMinimo, result) {   
    const sql = 'UPDATE sucursales_stock_epi SET oculto = 1 ,fecha_actualizacion = ? WHERE idsucursales_stock_epi= ?';
    connection.query(sql, [stockMinimo.fecha_actualizacion, stockMinimo.idsucursales_stock_epi], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    });         
};

StockMinimo.update = function(id,stockMinimo, result){
    const sql = 'UPDATE sucursales_stock_epi SET minimo = ?, fecha_actualizacion = ? WHERE idsucursales_stock_epi = ?';
    connection.query(sql, [stockMinimo.minimo, stockMinimo.fecha_actualizacion, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

StockMinimo.validation = function(stockMinimo){
    if(stockMinimo.minimo === null || stockMinimo.minimo === undefined || stockMinimo.minimo === ''){
        return Constantes.STOCK_MINIMO;
    } else{
        return true;
    } 
}


module.exports= StockMinimo;