const express = require('express');
const app = express();

//SETTINGS
app.set('port', process.env.PORT || 3000);

//MIDDLEWARES
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//ROUTES
app.use(require('./routes/empleado'));
/*app.use(require('./routes/material'));
app.use(require('./routes/login'));*/
app.use(require('./routes/directivo'));

app.use(require('./routes/loginPrueba'));

app.use(require('./routes/test'));

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});