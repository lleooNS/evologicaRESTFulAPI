const mysql = require('mysql');

const mysqlConnection = mysql.createConnection
({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sensoreamento'
});

mysqlConnection.connect((err) =>
{
	if(!err)
	{
		console.log('Conectado com sucesso!');
	}
	else
	{
		console.log('Falha na conexão! \n Erro: ' + JSON.stringify(err, undefined, 2));
	}
}); 


module.exports = mysqlConnection;
