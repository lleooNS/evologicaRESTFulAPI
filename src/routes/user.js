const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');


//Endpoints da tabela User


//[GET] Consultar data

//Exemplo: http://localhost:3000/api/v1/data/consultarUser
router.get('/api/v1/user/consultarUser', (req, res) =>
{
	mysqlConnection.query('SELECT * FROM User' ,(err, rows, fields) =>
	{
		if(!err)
		{
			res.send(rows);
		}
		else
		{
			console.log(err);
			throw err;
		}
	});
	
});

//[POST] Registrar User

/*
Exemplo: http://localhost:3000/api/v1/user/registrarUser

request =>
{
	"username": "Nome",
	"email": "teste@1"
}
*/
router.post('/api/v1/user/registrarUser', (req, res) =>
{
	//Registrar 
	mysqlConnection.query('INSERT INTO User (username, email) VALUES (?, ?)', [req.body.username, req.body.email], (err, rows, fields) =>
	{
		if(!err)
		{
			res.send('Inserido com sucesso!');
		}
		else
		{
			console.log(err);
			throw err;
		}
	})
});







module.exports = router;
