const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');


//Endpoints da tabela Unit




//[GET] Consultar unidades de grandeza ( unit )

//Exemplo: http://localhost:3000/api/v1/unit/consultarUnit
router.get('/api/v1/unit/consultarUnit', (req, res) =>
{
	//Retorna todas as unidades cadastradas
	mysqlConnection.query('SELECT * FROM Unit',(err, rows, fields) =>
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


//[POST] Registrar unidades de grandeza ( unit )

/*
Exemplo: http://localhost:3000/api/v1/unit/registrarUnit

request =>
{
	"label": "%"
}
*/
router.post('/api/v1/unit/registrarUnit', (req, res) =>
{
	//Registrar 
	mysqlConnection.query('INSERT INTO Unit (label) VALUES (?)', [req.body.label], (err, rows, fields) =>
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


//[DELETE]  Apagar unidades de grandeza ( unit )

//Exemplo: http://localhost:3000/api/v1/unit/apagarUnit/2
router.delete('/api/v1/unit/apagarUnit/:id', (req, res) =>
{
	//Deletar
	mysqlConnection.query('DELETE FROM Unit WHERE oid = ?', [req.params.id], (err, rows, fields) =>
	{
		if(!err)
		{
			res.send('Deletado com sucesso!');
		}
		else
		{
			console.log(err);
			throw err;
		}
	})
});


/*
router.put('/api/v1/unit', (req, res) =>
{
	var sql = "UPDATE Unit SET label = '#' WHERE oid = '11' "; 

	mysqlConnection.query(sql, (err, rows, fields) =>
	{
		if(!err)
		{
			res.send('Atualizado com sucesso!');
		}
		else
		{
			console.log(err);
			throw err;
		}
	})
});
*/



module.exports = router;
