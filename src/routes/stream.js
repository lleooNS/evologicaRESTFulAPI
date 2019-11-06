const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

//Endpoints da tabela Stream

//--- Funções Auxiliares ---

//Realiza o tratamento de strings
function mysqlEscape(stringToEscape)
{
    return stringToEscape
        .replace("\\", "\\\\")
        .replace("\'", "\\\'")
        .replace("\"", "\\\"")
        .replace("\n", "\\\n")
        .replace("\r", "\\\r")
        .replace("\x00", "\\\x00")
        .replace("\x1a", "\\\x1a");
}

//Gera a chave de identificação
function gerarKey() 
{
	var text = '';
	var possible = '0123456789abcdefghijklmnopqrstuvwxyz';

	for (var i = 0; i < 32; i++)
	text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

// ----------------------------


//[GET] Consultar streams

//Exemplo: http://localhost:3000/api/v1/stream/consultarStream
router.get('/api/v1/stream/consultarStream', (req, res) =>
{
	mysqlConnection.query('SELECT * FROM Stream',(err, rows, fields) =>
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


//[POST] Registrar Stream ( stream ) para Sensor ( sensor ). Ex: key: 27b26e48cd674cc38ec45808cf48fa07

/*
	É necessário fornecer a chave de identificação do sensor associado ao stream 
	Exemplo: http://localhost:3000/api/v1/stream/registrarStreamSensor/27b26e48cd674cc38ec45808cf48fa07
	
	request =>
	{
		"label": "temperature",
		"unit": 1
	}
*/
router.post('/api/v1/stream/registrarStreamSensor/:key', (req, res) =>
{
	//Encontra o oid do sensor
	var sql1 = "SELECT * FROM Sensor WHERE Sensor.key = '"+req.params.key+"'";

	mysqlConnection.query(sql1, (err, rows, fields) =>
	{
		if(!err)
		{
			var oidSensor = rows[0].oid;
			
			//Gera a chave de identificação
			var key = gerarKey();
			
			//Realiza o tratamento das strings
			var label = mysqlEscape(req.body.label);
			
			//Registrar
			var sql = "INSERT INTO `Stream` (`key`, `label`, `enabled`, `sensorStream`, `unitStream`) VALUES ('"+key+"', '"+label+"', '1', '"+oidSensor+"', '"+req.body.unit+"');";
		

			mysqlConnection.query(sql, (err, rows, fields) =>
			{
				if(!err)
				{	
					//<= response
					res.json({oid: rows.insertId, key: key, label: req.body.label, unit: req.body.unit, sensor: oidSensor, totalSize: 0});
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
