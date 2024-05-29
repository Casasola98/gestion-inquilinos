const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const mssql = require("mssql");

const app = express();
app.use(cors({ origin: true, credentials: true }));

var jsonParser = bodyParser.json();

const config = {
	user: 'newSA',
	password: 'mypassword',
	server: 'localhost',
	database: 'Libreria',
	trustServerCertificate: true
};

app.get('/autores', (req, res) => {
	// Connect to your database
	mssql.connect(config, function (err) {
		// Create Request object to perform
		// query operation
		let request = new mssql.Request();

		// Query to the database and get the records
		request.query('SELECT * FROM Author',
			function (err, records) {

				if (err) console.log(err)

				// Send records as a response
				// to browser
				res.send(records);

			});
	});
})

//GETS para los SELECT que no dependen de ningun dato del usuario para realizarse.
app.get('/libros', (req, res) => {
	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		request.query('SELECT ID_Libro, Titulo, Genero.Descripcio AS Genero, Descripcion, Author.Nombre AS Autor FROM Libro JOIN Author ON Author.ID_Autor = LibrO.Author JOIN Genero ON Genero.ID_Genero = Libro.Genero',
			function (err, records) {
				if (err) {
					console.log(err)
				}
				res.send(records);
			});
	});
})

//Usar post para los CREATE, UPDATE, DELETE y los SELECT que requieren info del FE para saber que obtener
//O sea, post para todo lo que ocupa info del FE
app.post('/libro', jsonParser, (req, res) => {
	const datos = req.body;
	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = `SELECT ID_Libro, Titulo, Genero.Descripcio AS Genero, Descripcion, Author.Nombre AS Autor FROM Libro JOIN Author ON Author.ID_Autor = Libro.Author JOIN Genero ON Genero.ID_Genero = Libro.Genero WHERE Libro.Author = ${datos.ID_Author}`;
		request.query(query,
			function (err, records) {
				if (err) {
					console.log(err)
				}
				res.send(records);
			}
		);
	});
})

//Hace que en Backend se encuentre escuchando solicitudes en el puesto 8080 de la compu
app.listen(8080, () => {
	console.log('server listening on port 8080')
})