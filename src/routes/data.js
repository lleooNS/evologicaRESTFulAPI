const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

//Endpoints da tabela Data


//[GET] Consultar data

//Exemplo: http://localhost:3000/api/v1/data/consultarData
router.get('/api/v1/data/consultarData', (req, res) =>
{
	mysqlConnection.query('SELECT * FROM Data',(err, rows, fields) =>
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



//[GET] Consulta de dados de um Stream ( stream ) específico. Ex: key: 8961bd9a4d1e439ebf3b86af5b9d5c1f

//É necessário fornecer a chave de identificação associada ao stream
//Exemplo: http://localhost:3000/api/v1/data/consultarDataStream/8961bd9a4d1e439ebf3b86af5b9d5c1f
router.get('/api/v1/data/consultarDataStream/:key', (req, res) =>
{
	//Stream
	var sql1 = "SELECT * FROM Stream WHERE Stream.key = '"+req.params.key+"'";

	mysqlConnection.query(sql1, (err, rows, fields) =>
	{
		var response = [];
	
		if(!err)
		{
			//Armazena stream
			var stream = rows;
			var streamOid = rows[0].oid;
		
			//Data
			var sql2 = "SELECT * FROM Data WHERE Data.streamData = '"+streamOid+"'";
			
			mysqlConnection.query(sql2, (err, rows, fields) =>
			{
				if(!err)
				{	
					var data = [];
		
					//Formatar
					rows.forEach(function (row)
					{
						data.push({timestamp: row.timestamp, data: row.value});
					});
		
					response.push({oid: stream[0].oid, key: stream[0].key, label: stream[0].label, unit: stream[0].unitStream, sensor: stream[0].sensorStream, totalSize: 0, data: data});
					
					//Retorna
					res.send(response);
				}
				else
				{
					console.log(err);
					throw err;
				}
			});
				
		}
		else
		{
			console.log(err);
			throw err;
		}
	});

});






//[POST] Publicar dado em um Stream ( stream ). Ex: key: 8961bd9a4d1e439ebf3b86af5b9d5c1f

/*
	É necessário fornecer a chave de identificação do stream associado ao data  
	Exemplo: http://localhost:3000/api/v1/data/publicarDataStream/27b26e48cd674cc38ec45808cf48fa07
	
	request =>
	{
		"timestamp": 1506521102,
		"value": 28.5
	}
*/
router.post('/api/v1/data/publicarDataStream/:key', (req, res) =>
{
	//Encontra o oid do stream
	var sql1 = "SELECT * FROM Stream WHERE Stream.key = '"+req.params.key+"'";

	mysqlConnection.query(sql1, (err, rows, fields) =>
	{
		if(!err)
		{
			var oidStream = rows[0].oid;
		
			//Registrar
			var sql = "INSERT INTO `Data` (`timestamp`, `value`, `streamData`) VALUES ('"+req.body.timestamp+"', '"+req.body.value+"', '"+oidStream+"');";

			mysqlConnection.query(sql, (err, rows, fields) =>
			{
				if(!err)
				{
					//<= response	
					res.json({oid: rows.insertId, timestamp: req.body.timestamp, value: req.body.value});
				}
				else
				{
					console.log(err);
					throw err;
				}
			})
		}
		else
		{
			console.log(err);
			throw err;
		}
	});

});






module.exports = router;
