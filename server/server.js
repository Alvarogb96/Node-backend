const express = require('express');
const app = express();
const cors = require('cors')


//SETTINGS
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});

//MIDDLEWARES
app.use(express.json());
app.use(cors());

/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});*/


//ROUTES
app.use(require('./routes/login'));
app.use(require('./routes/test'));
app.use(require('./routes/usuario'));
app.use(require('./routes/noticia'));
app.use(require('./routes/jornada'));
app.use(require('./routes/solicitudBaja'));
app.use(require('./routes/solicitudEpi'));
app.use(require('./routes/tipoEpi.js'));
app.use(require('./routes/tipoTest.js'));

