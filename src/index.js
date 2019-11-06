const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());

app.set('port', process.env.Port || 3000);

//Todas as rotas
app.use(require('./routes/unit'));
app.use(require('./routes/user'));
app.use(require('./routes/sensor'));
app.use(require('./routes/stream'));
app.use(require('./routes/data'));





app.listen(app.get('port'), () =>
{
	console.log('Servidor inicializado na porta:', app.get('port'));
});

