RESTFul API

Objetivo

	Implementar um serviço de backend (com um modelo e persistência de dados) que provê uma RESTFul API para os desenvolvedores de front-end atendendo a necessidade de um projeto específico.
	
Ferramentas Utilizadas

	Linux
	Node.js - linux:
		
		sudo apt-get update
		sudo apt-get install nodejs
		sudo apt-get install npm
		
	XAMPP - PHPmyAdmin
	Mysql
	Postman
	
Execução do Código

	Baixar e extrair os arquivos.
	Verificar o arquivo de configuração do banco de dados: Se o PHPmyAdmin (ou outro de preferência) necessita que uma senha seja fornecida:
	
		src/database.js

			password: '',
			
	Abrir o PHPmyAdmin (ou outro de preferência), importar o arquivo "localhost.sql".
	Abrir o terminal na pasta aonde se encontra o projeto e executar os seguintes comandos:
	
		npm install
		npm start
		
	Abrir a ferramenta Postman.
	
Preenchimento do Banco de Dados

	A tabela User pode ser preenchida manualmente ou pelos endpoints que serão apresentados.
	
Endpoints do projeto específico

	Comando inseridos na ferramenta Postman:

-------------------------------------------------------------------------------	
	
	[POST] Registrar ( User )

	Exemplo: http://localhost:3000/api/v1/user/registrarUser

	request =>
	{
		"username": "User",
		"email": "teste@1"
	}
	
-------------------------------------------------------------------------------	
	
	[POST] Registrar unidades de grandeza ( Unit )


	Exemplo: http://localhost:3000/api/v1/unit/registrarUnit

	request =>
	{
		"label": "%"
	}

-------------------------------------------------------------------------------	
	
	[POST] Registrar Sensor ( Sensor )


	**É necessário fornecer o email do usuário associado ao sensor
	Exemplo: http://localhost:3000/api/v1/sensor/registrarSensor/teste@1

	request =>
	{
		"label": "Kitchen's freezer sensor (Arduino)",
		"description": "Kitchen's freezer sensor (Arduino)"
	}

-------------------------------------------------------------------------------		
		
	[POST] Registrar Stream ( Stream ) para Sensor ( Sensor ). Ex: key: 27b26e48cd674cc38ec45808cf48fa07


	**É necessário fornecer a chave de identificação do sensor associado ao stream 
	Exemplo: http://localhost:3000/api/v1/stream/registrarStreamSensor/27b26e48cd674cc38ec45808cf48fa07
	
	request =>
	{
		"label": "temperature",
		"unit": 1
	}

-------------------------------------------------------------------------------	
	
	[POST] Publicar dado em um Stream ( Stream ). Ex: key: 8961bd9a4d1e439ebf3b86af5b9d5c1f


	**É necessário fornecer a chave de identificação do stream associado ao data  
	Exemplo: http://localhost:3000/api/v1/data/publicarDataStream/27b26e48cd674cc38ec45808cf48fa07
	
	request =>
	{
		"timestamp": 1506521102,
		"value": 28.5
	}

-------------------------------------------------------------------------------	

	[GET] Consultar unidades de grandeza ( Unit )

	Exemplo: http://localhost:3000/api/v1/unit/consultarUnit

-------------------------------------------------------------------------------	

	[GET] Consultar Sensores ( Sensor ) de um Usuário ( User )

	**É necessário fornecer o email do usuário associado ao sensor
	Exemplo: http://localhost:3000/api/v1/sensor/consultarSensorUser/teste@1

-------------------------------------------------------------------------------	

	[GET] Consulta de um Sensor ( Sensor ) específico. Ex: key: 27b26e48cd674cc38ec45808cf48fa07

	**É necessário fornecer a chave de identificação associada ao sensor
	Exemplo: http://localhost:3000/api/v1/sensor/consultarSensor/27b26e48cd674cc38ec45808cf48fa07
	
-------------------------------------------------------------------------------	

	[GET] Consulta de dados de um Stream ( Stream ) específico. Ex: key: 8961bd9a4d1e439ebf3b86af5b9d5c1f

	**É necessário fornecer a chave de identificação associada ao stream
	Exemplo: http://localhost:3000/api/v1/data/consultarDataStream/8961bd9a4d1e439ebf3b86af5b9d5c1f



Observações

	*A funcionalidade da variável "totalSize" não foi encontrada na especificação do projeto.
	
	*As questões envolvendo a segurança dos dados e a vulnerabilidade não foram tratadas neste projeto. Assim como alguns tratamentos de possíveis erros na inserção de dados no banco.
	
	
