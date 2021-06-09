const connection = require('../database');

exports.addTest = async(req, res) => {
    const sql = 'INSERT INTO tests SET ?';
    const test = req.body.test;
    connection.query(sql, test, error => {
        if (error) throw error;
        res.send('Test añadido');
      });
}

exports.readTest = (req, res) =>{
    const { id } = req.params;
    const sql = 'SELECT * FROM tests WHERE id_test =?';
    connection.query(sql, [id] ,  (err,results)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else if(results.length > 0){
            const test = results[0];
            res.status(200).json({test: test});
        } else {
            res.status(404).send('Error en la consulta');
        }
    });
}

exports.tests = (req,res) =>{
    const sql = 'SELECT * FROM tests';
    if(req.body.role === process.env.ROLE_DIRECTIVO){
    connection.query(sql, (err,results)=>{
        if(err){
            console.log(err)
            
        } else if(results.length > 0){
            tests = results;
            res.status(200).json({tests});
        } else {
            res.send("No hay tests realizados por empleados, registrados en el sistema");
        }
    });
    } else {
        res.status(500).send('Error permisos');
    }
}

exports.readTestEmpleado = (req, res) =>{
    const { id } = req.params;
    const sql = 'SELECT * FROM tests WHERE id_empleado =?';
    connection.query(sql, [id] ,  (err,results)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else if(results.length > 0){
            const test = results[0];
            res.status(200).json({test: test});
        } else {
            res.status(404).send('Error en la consulta');
        }
    });
}
