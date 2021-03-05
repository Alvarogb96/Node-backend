const express = require('express');
const app = express();

//SETTINGS
app.set('port', process.env.PORT || 3000);

//MIDDLEWARES
app.use(express.json());

//ROUTES
app.use(require('./routes/empleado'));
app.use(require('./routes/material'));

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});