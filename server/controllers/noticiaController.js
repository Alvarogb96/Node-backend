const connection = require('../database');

exports.addNoticia = async(req, res) => {
    const sql = 'INSERT INTO noticias SET ?';
    const noticiaObJ = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
    };
    connection.query(sql, noticiaObJ, error => {
        if (error) throw error;
        res.send('Noticia añadida');
      });
}

exports.readNoticia = (req, res) =>{
    const { id } = req.params;
    const sql = 'SELECT * FROM noticias WHERE id_noticia =?';
    connection.query(sql, [id] ,  (err,results)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else if(results.length > 0){
            const noticia = results[0];
            res.status(200).json({noticia: noticia});
        } else {
            res.status(404).send('Error en la consulta')
        }
    });
}

exports.noticias = (req,res) =>{
    const sql = 'SELECT * FROM noticias';
    connection.query(sql, (err,results)=>{
        if(err){
            console.log(err)
            
        } else if(results.length > 0){
            noticias = results;
            res.status(200).json({noticias});
        } else {
            res.send("No hay noticias registradas en el sistema");
        }
    });
}
