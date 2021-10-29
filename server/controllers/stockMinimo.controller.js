const StockMinimo = require('../models/stockMinimo.model');

exports.create = function(req, res) {
    const stockMinimo = new StockMinimo(req.body);
    var mensaje = StockMinimo.validation(stockMinimo);
   if(mensaje != true){
        res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
    }else{
        StockMinimo.create(stockMinimo, function(err, stockMinimo) {
            if (err) {
                res.json({error:true,err});
            } else {
                res.json({error:false,message:"Stock mínimo de epi añadido",data:stockMinimo});
            }
        });
    }
};

exports.findByIdSucursal = function(req, res) {
    StockMinimo.findByIdSucursal(req.params.id, function(err, stockMinimo) {
        if (err)
        res.json({error:true,err});
        if(stockMinimo.length > 0){
            res.status(200).json({stockMinimo: stockMinimo});
        } else {
            res.status(404).send('No hay información de stock mínimo en esta sucursal')
        }
    });
};

exports.update = function(req, res) {
    const stockMinimo = new StockMinimo(req.body);
    var mensaje = StockMinimo.validation(stockMinimo);
    if(mensaje != true){
        res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
    }else{
        StockMinimo.update(stockMinimo.idsucursales_stock_epi,stockMinimo, function(err, stockMinimo) {
            if (err){
                res.json({error:true,err});
            }
            else {
                res.json({error:false,message:"Stock mínimo de epi actualizado"})
            }
        });
    }
};

exports.createStockEpis = function(req, res) {
    for(var stockEpi of req.body){
    const stockMinimo = new StockMinimo(stockEpi);
    var mensaje = StockMinimo.validation(stockMinimo);
   if(mensaje != true){
        res.status(400).send({ error:true, message: 'Valor incorrecto de ' + mensaje });
    }else{
        if(stockMinimo.idsucursales_stock_epi === null){
            StockMinimo.create(stockMinimo, function(err, stockMinimo) {
                if (err) {
                    res.json({error:true,err});
                } else {
                }
            });
        } else {
                StockMinimo.update(stockMinimo.idsucursales_stock_epi,stockMinimo, function(err, stockMinimo) {
                    if (err) {
                        res.json({error:true,err});
                    } else {
                        
                    }
                });
            
        }
    }
}
res.json({error:false,message:"Stock mínimo de epi añadido"});
};