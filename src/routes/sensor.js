const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

//Endpoints da tabela Sensor

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


//[GET] Consultar sensores

//Exemplo: http://localhost:3000/api/v1/sensor/consultarSensor
router.get('/api/v1/sensor/consultarSensor', (req, res) =>
{
	mysqlConnection.query('SELECT * FROM Sensor',(err, rows, fields) =>
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




//[GET] Consultar Sensores ( sensor ) de um Usuário ( user )

//É necessário fornecer o email do usuário associado ao sensor
//Exemplo: http://localhost:3000/api/v1/sensor/consultarSensorUser/teste@1
router.get('/api/v1/sensor/consultarSensorUser/:userEmail', (req, res) =>
{
	//User
	var sql1 = "SELECT * FROM User WHERE User.email = '"+req.params.userEmail+"'";

	mysqlConnection.query(sql1, (err, rows, fields) =>
	{
		if(!err)
		{
			var userOid = rows[0].oid;
			
			//SELECT * FROM Sensor left outer join Stream on Sensor.oid = Stream.sensorStream WHERE Sensor.userSensor = '1'
			var sql4 = "SELECT Sensor.oid as idSensor, Sensor.key as keySensor, Sensor.label as labelSensor, Sensor.description as descSensor, Sensor.userSensor as idUserSensor, Stream.oid as idStream, Stream.key as keyStream, Stream.label as labelStream, Stream.enabled as eStream, Stream.sensorStream as idSensorStream, Stream.unitStream as idUnitStream FROM Sensor left outer join Stream on Sensor.oid = Stream.sensorStream WHERE Sensor.userSensor = '"+userOid+"'";
		
			//var sql3 = "SELECT * FROM Sensor left outer join Stream on Sensor.oid = Stream.sensorStream WHERE Sensor.userSensor = '"+userOid+"'";
		
			//Sensor
			//var sql2 = "SELECT * FROM Sensor WHERE Sensor.userSensor = '"+userOid+"'";
			
			mysqlConnection.query(sql4, (err, rows, fields) =>
			{
				if(!err)
				{
			//		console.log(rows);
				
					//var sensores = rows;
					var response = [];
					var id; 
					
					//Faltou os streams associados
					//var stream = [];
								
					//Formata	 
					rows.forEach(function (row)
					{
						if(row.idSensor != id)
						{
							var stream = [];
							var idIgual = row.idSensor;
							
							rows.forEach(function (roww)
							{
								if(roww.idSensor == idIgual)
								{
									stream.push({	oid: roww.idStream, 
												key: roww.keyStream,
												label: roww.labelStream,
												unit: roww.idUnitStream,
												sensor: roww.idSensorStream,
												totalSize: 0});
								}
											
							});
						
							response.push({	oid: row.idSensor, 
											key: row.keySensor,
											label: row.labelSensor,
											description: row.descSensor,
											streams: stream});
						
							id = row.idSensor;
						}
					
					
						
						
					});
					
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





//[GET] Consulta de um Sensor ( sensor ) específico. Ex: key: 27b26e48cd674cc38ec45808cf48fa07

//É necessário fornecer a chave de identificação associada ao sensor
//Exemplo: http://localhost:3000/api/v1/sensor/consultarSensor/27b26e48cd674cc38ec45808cf48fa07
router.get('/api/v1/sensor/consultarSensor/:key', (req, res) =>
{
	//Sensor
	var sql1 = "SELECT * FROM Sensor WHERE Sensor.key = '"+req.params.key+"'";

	mysqlConnection.query(sql1, (err, rows, fields) =>
	{
		var response = [];
	
		if(!err)
		{
			var sensores = rows;
	
			var sensorOid = rows[0].oid;
		
			//Stream	
		//	var sql2 = "SELECT * FROM Stream WHERE Stream.sensorStream = '"+sensorOid+"'";
		
			
			var sql4 = "SELECT Stream.oid as idStream, Stream.key as keyStream, Stream.label as labelStream, Stream.sensorStream as idSensorStream, Stream.unitStream as idUnitStream, Data.oid as idData, Data.timestamp as timeData, Data.value as valueData, Data.streamData as idStreamData FROM Stream left outer join Data on Stream.oid = Data.streamData WHERE Stream.sensorStream = '"+sensorOid+"'";
			
			mysqlConnection.query(sql4, (err, rows, fields) =>
			{
				if(!err)
				{
	//				console.log(rows);
				
					var stream = [];
					
					var id; 
				
					rows.forEach(function (row)
					{
						if(row.idStream != id)
						{
							var data = [];
							var idIgual = row.idStream;
							
							rows.forEach(function (roww)
							{
								if(roww.idStream == idIgual)
								{
									data.push({	timestamp: roww.timeData, 
												data: roww.valueData});
								}
											
							});
						
							stream.push({	oid: row.idStream, 
										key: row.keyStream,
										label: row.labelStream,
										unit: row.idUnitStream,
										sensor: row.idSensorStream,
										totalSize: 0,
										data: data});
										
							id = row.idStream;		
						}
					});
				
					//Formata
					response.push({oid: sensores[0].oid, key: sensores[0].key, label: sensores[0].label, description: sensores[0].description, streams: stream });
				
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







//[POST] Registrar Sensor ( sensor )

/*
	É necessário fornecer o email do usuário associado ao sensor
	Exemplo: http://localhost:3000/api/v1/sensor/registrarSensor/teste@1

	request =>
	{
		"label": "Kitchen's freezer sensor (Arduino)",
		"description": "Kitchen's freezer sensor (Arduino)"
	}
*/
router.post('/api/v1/sensor/registrarSensor/:userEmail', (req, res) =>
{
	//Gera a chave de identificação
	var key = gerarKey();

	//Encontra o oid do usuário
	var sql1 = "SELECT * FROM User WHERE User.email = '"+req.params.userEmail+"'";

	mysqlConnection.query(sql1, (err, rows, fields) =>
	{
		if(!err)
		{
			var userOid = rows[0].oid;
		
			//Realiza o tratamento das strings
			var label = mysqlEscape(req.body.label);
			var description = mysqlEscape(req.body.description);

			//Registrar
			var sql = "INSERT INTO `Sensor` (`key`, `label`, `description`, `userSensor`) VALUES ('"+key+"', '"+label+"', '"+description+ "', '"+userOid+"')";

			mysqlConnection.query(sql, (err, rows, fields) =>
			{
				if(!err)
				{
					//<= response
					res.json({oid: rows.insertId, key: key, label: req.body.label, description: req.body.description});
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
	
	})
});







module.exports = router;
