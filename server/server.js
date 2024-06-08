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
	database: 'Proyecto1',
	trustServerCertificate: true
};

const getFecha = (fecha) => {
	return `${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate()}`;
}

const getHora = (fecha) => {
	return `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
}

const addMonths = (fecha, months) => {
    var day = fecha.getDate();
    fecha.setMonth(fecha.getMonth() + +months);
    if (fecha.getDate() != day) {
      fecha.setDate(0);
    }
    return `${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate()}`;
}

//ingresarSistema
app.post('/login', jsonParser, (req, res) => {
	const datos = req.body;
	//variables enviados por el body
	let cedula = datos.cedula;
	let rol = datos.rol;
	//------------------------------
	mssql.connect(config, function (err) {
	let request = new mssql.Request();
	let query = '';
	if (rol == 'admin') {
		query = `EXEC obtenerAdmin ${cedula}`;
	} 
	else if (rol == 'propietario') {
			query = `EXEC obtenerPropietario ${cedula}`;
	} 
	else {
			query = `EXEC obtenerInquilino ${cedula}`;
	}
	request.query(query,
		function (err, records) {
			if (err) {
				console.log(err)
			}
			if (records.recordset.length > 0) {
				res.send({
					existeUsuario: true
				});
			}
			else {
				res.send({
					existeUsuario: false
				});
			}
		}
	);
	});
})

//registrarInquilinosPropietarios

app.post('/registrar', jsonParser, (req, res) => {
	const datos = req.body;
	let cedula = datos.cedula;
	let nombre = datos.nombre; 
	let apellido1 = datos.apellido1;
	let apellido2 = datos.apellido2;
	let telefono = datos.telefono;
	let correo = datos.correo;
	let rol = datos.rol

	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = '';
		if (rol == 'propietario') {
			query = `EXEC obtenerPropietario ${cedula}`;
		}
		else {
			query = `EXEC obtenerInquilino ${cedula}`;
		}
		request.query(query,
			function (err, records) {
				if (err) {
					console.log(err)
				}
				if (records.recordset.length == 0) {
					let query2 = '';
					if (rol == 'propietario') {
						query2 = `EXEC insertarPropietario ${cedula}, '${nombre}', '${apellido1}', '${apellido2}', ${telefono}, '${correo}'`;
					}
					else {
						query2 = `EXEC insertarInquilino ${cedula}, '${nombre}', '${apellido1}', '${apellido2}', ${telefono}, '${correo}'`;
					}
					let request2 = new mssql.Request();
					request2.query(query2,
						function (err2, records2) {
							if (err2) {
								res.send({
									registrarAdmin: false
								});
							}
							else {
								res.send({
									registrarAdmin: true
								});
							}							
						});
					
				}
				else {
					res.send({
						insertarUsuario: false
					});
				}
			}
		);
	});
})

app.post('/registrarAdmin', jsonParser, (req, res) => {
	//registrar solo Admin
	const datos = req.body;
	//variables enviados por el body
	let idUsuario = datos.idUsuario;
	let correo = datos.correo
	//------------------------------
	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = `EXEC obtenerAdmin ${idUsuario}`;
		request.query(query,
			function (err, records) {
				if (err) {
					console.log(err)
				}
				if (records.recordset.length == 0) {
					let request2 = new mssql.Request();
					let query2 = `EXEC insertarAdmin ${idUsuario}, '${correo}'`;
					request2.query(query2,
						function (err2, records2) {
							if (err2) {
								res.send({
									registrarAdmin: false
								});
							}
							else {
								res.send({
									registrarAdmin: true
								});
							}							
						});
				}
				else {
					res.send({
						registrarAdmin: false
					});
				}
			}
		);
	});
})


//       ********** PROPIETARIO **********
// MODULO PROPIEDAD (propietario)
app.post('/crearPropiedad', jsonParser, (req, res) => {
	const datos = req.body;
	//variables enviados por el body
	let idPropiedad = datos.idPropiedad;
	let direccion = datos.direccion; 
	let idTipoPropiedad = datos.idTipoPropiedad ;
	let numeroHabitaciones = datos.numeroHabitaciones; 
	let tamanoMetros = datos.tamanoMetros; 
	let descripcion = datos.descripcion;  
	let estadoActual = datos.estadoActual;
	let precioAlquiler = datos.precioAlquiler; 
	let cedula = datos.cedula;

	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = `EXEC obtenerPropiedad ${idPropiedad}`;
		request.query(query,
			function (err, records) {
				if (err) {
					console.log(err)
				}
				if (records.recordset.length == 0) {
					let request2 = new mssql.Request();
					let query2 = `EXEC insertarPropiedad ${idPropiedad}, "${direccion}", ${idTipoPropiedad}, ${numeroHabitaciones}, ${tamanoMetros}, "${descripcion}", ${estadoActual}, ${precioAlquiler}, ${cedula}`;
					request2.query(query2,
						function (err2, records2) {
							if (err2) {
								res.send({
									registrarPropiedad: false
								});
							}
							else {
								res.send({
									registrarPropiedad: true
								});
							}							
						});
				}
				else {
					res.send({
						registrarPropiedad: false
					});
				}
			}
		);
	});
	
})

app.post('/visualizarPropiedades', jsonParser, (req, res) => {
	const datos = req.body;
	//variables enviados por el body
	let cedula = datos.cedula;
	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = `EXEC obtenerPropiedad ${cedula}`;
		request.query(query,
			function (err, records) {
				if (err) {
					console.log(err)
				}
				res.send(records);
			});
	});
})

app.post('/editarPropiedad', jsonParser, (req, res) => {
	const datos = req.body;
	//variables enviados por el body
	let idPropiedad = datos.idPropiedad;
	let direccion = datos.direccion; 
	let idTipoPropiedad = datos.idTipoPropiedad ;
	let numeroHabitaciones = datos.numeroHabitaciones; 
	let tamanoMetros = datos.tamanoMetros; 
	let descripcion = datos.descripcion;  
	let estadoActual = datos.estadoActual;
	let precioAlquiler = datos.precioAlquiler; 
	let cedula = datos.cedula;

	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = `EXEC cambiarPropiedad ${idPropiedad}, "${direccion}", ${idTipoPropiedad}, ${numeroHabitaciones}, ${tamanoMetros}, "${descripcion}", ${estadoActual}, ${precioAlquiler}, ${cedula}`;
		request.query(query,
			function (err, records) {
				if (err) {
					res.send({
						editarPropiedad: false
					});
				}
				else {
					res.send({
						editarPropiedad: true
					});
				}	
			});
	});
})

//No valida que exista la propiedad porque se supone que en la tabla ya aprecen solo las que tiene el propietario
app.post('/eliminarPropiedad', jsonParser, (req, res) => {
	const datos = req.body;
	//variables enviados por el body
	let idPropiedad = datos.idPropiedad;

	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = `EXEC eliminarPropiedad ${idPropiedad}`;
		request.query(query,
			function (err, records) {
				if (err) {
					res.send({
						editarPropiedad: false
					});
				}
				else {
					res.send({
						editarPropiedad: true
					});
				}	
			});
	});

})

// MODULO INQUILINOS (Propietario)

//Cuando se hace click en aceptar la solicitud

app.post('/crearInquilinoAmenidad', jsonParser, (req, res) => {
	//obtiene los datos de la tabla de solicitudes para aceptar, cambian las solicitudes 
	const datos = req.body;
	//variables enviados por el body
	let cedula = datos.cedula;
	let fechaInicio = datos.fechaInicio; 
	let fechaFin = datos.fechaFin ;
	let idAmenidad = datos.idAmenidad; 
	let estadoSolicitud = 'ACEPTADA'; 

	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = `EXEC insertarAlquilerAmen ${cedula}, '${fechaInicio}', '${fechaFin}', ${idAmenidad}`;
		request.query(query,
			function (err, records) {
				if (err) {
					res.send({
						aceptarAlquiler: false
					});
				}
				else {
					let query2 = `EXEC cambiarSolicitudAlquilerA ${idAmenidad}, '${estadoSolicitud}'`
					let request2 = new mssql.Request();
					request2.query(query2,
						function (err2, records) {
							if (err2) {
								res.send({
									aceptarAlquiler: false
								});
							}
							else {
								res.send({
									aceptarAlquiler: true
								});
							}	
						});
				}	
			});
	});
})

app.post('/denegarInquilinoAmenidad', jsonParser, (req, res) => {
	//obtiene los datos de la tabla de solicitudes para aceptar, cambian las solicitudes 
	const datos = req.body;
	//variables enviados por el body
	let idAmenidad = datos.idAmenidad; 
	let estadoSolicitud = 'DENEGADA'; 

	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = `EXEC cambiarSolicitudAlquilerA ${idAmenidad}, '${estadoSolicitud}'`;
		request.query(query,
			function (err, records) {
				if (err) {
					res.send({
						editarPropiedad: false
					});
				}
				else {
					res.send({
						denergarInquilino: true
					});
	
				}	
			});
	});
})



app.post('/crearInquilinoPropiedad', jsonParser, (req, res) => {
	//obtiene los datos de la tabla de solicitudes para aceptar y denegar, cambian las solicitudes 
	const datos = req.body;
	//variables enviados por el body
	let cedula = datos.cedula;
	let fechaInicio = datos.fechaInicio; 
	let fechaFin = datos.fechaFin ;
	let idPropiedad = datos.idPropiedad; 
	let estadoSolicitud = 'ACEPTADA'; 
	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = `EXEC insertarAlquilerProp ${cedula}, '${fechaInicio}', '${fechaFin}', ${idPropiedad}`;
		request.query(query,
			function (err, records) {
				if (err) {
					res.send({
						editarPropiedad: false
					});
				}
				else {
					let query2 = ` EXEC cambiarSolicitudAlquilerP ${idPropiedad}, '${estadoSolicitud}'`
					let request2 = new mssql.Request();
					request2.query(query2,
						function (err2, records) {
							if (err2) {
								res.send({
									editarPropiedad: false
								});
							}
							else {
								res.send({
									editarPropiedad: true
								});
							}	
						});
				}	
			});
	});
	//insertarAlquilerProp(@cedulaUsuario INT, @fechaInicio DATE, @fechaFin DATE, @idPropiedad INT)
	//cambiarSolicitudAlquilerP(@idPropiedad INT, @estadoSolicitud INT)
})

app.post('/denegarInquilinoPropiedad', jsonParser, (req, res) => {
	//obtiene los datos de la tabla de solicitudes para aceptar, cambian las solicitudes 
	const datos = req.body;
	//variables enviados por el body
	let idPropiedad = datos.idPropiedad; 
	let estadoSolicitud = 'DENEGADA'; 

	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = `EXEC cambiarSolicitudAlquilerP ${idPropiedad}, '${estadoSolicitud}'`;
		request.query(query,
			function (err, records) {
				if (err) {
					res.send({
						editarPropiedad: false
					});
				}
				else {
					res.send({
						denergarInquilino: true
					});
	
				}	
			});
	});
})


app.post('/visualizarInquilinosP', jsonParser, (req, res) => {
	//visualiza inquilinos activos 
	const datos = req.body;
	//variables enviados por el body
	let cedula = datos.cedula;
	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = `EXEC obtenerInquilinosPropietarioP ${cedula}`;
		request.query(query,
			function (err, records) {
				if (err) {
					console.log(err)
				}
				res.send(records);
			});
	});

})

app.post('/visualizarInquilinosA', jsonParser, (req, res) => {
	//visualiza inquilinos activos 
	const datos = req.body;
	//variables enviados por el body
	let cedula = datos.cedula;
	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = ` EXEC obtenerInquilinosPropietarioA ${cedula}`;
		request.query(query,
			function (err, records) {
				if (err) {
					console.log(err)
				}
				res.send(records);
			});
	});

})

//Revisar
app.post('/editarInquilinoA', jsonParser, (req, res) => {
	//editar un inquilino  seleccione el botón va pasar a tener la funcionalidad de interrumpir el alquiler.
	const datos = req.body;
	//variables enviados por el body
	let cedulaPropietario = datos.cedulaPropietario;
	let cedulaInquilino = datos.cedulaInquilino;
	let fechaActual = new Date();
	let fechaMensaje = getFecha(fechaActual);
	let horaMensaje = getHora(fechaActual); 
	let newMonth = datos.newMonth;
	let contenido = datos.contenido; 
	let idAmenidad = datos.idAmenidad;  
	let fechaDesalojo = addMonths(fechaActual, newMonth);

	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = ` EXEC interrumpirAlquilerA ${cedulaPropietario}, ${cedulaInquilino}, '${fechaMensaje}', '${horaMensaje}', '${contenido}', ${idAmenidad}, '${fechaDesalojo}'`;
		request.query(query,
			function (err, records) {
				console.log(err);
				if (err) {
					res.send({
						interrumpirAlquiler: false
					});
				}
				else {
					res.send({
						interrumpirAlquiler: true
					});
	
				}	
			});
	});
	 
})

app.post('/editarInquilinoP', jsonParser, (req, res) => {
	//editar un inquilino  seleccione el botón va pasar a tener la funcionalidad de interrumpir el alquiler.
	const datos = req.body;
	//variables enviados por el body
	let cedulaPropietario = datos.cedulaPropietario;
	let cedulaInquilino = datos.cedulaInquilino;
	let fechaActual = new Date();
	let fechaMensaje = getFecha(fechaActual);
	let horaMensaje = getHora(fechaActual); 
	let newMonth = datos.newMonth;
	let contenido = datos.contenido; 
	let idPropiedad = datos.idPropiedad;  
	let fechaDesalojo = addMonths(fechaActual, newMonth);

	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = ` EXEC interrumpirAlquilerP ${cedulaPropietario}, ${cedulaInquilino}, '${fechaMensaje}', '${horaMensaje}', '${contenido}', ${idPropiedad}, '${fechaDesalojo}'`;
		request.query(query,
			function (err, records) {
				console.log(err);
				if (err) {
					res.send({
						interrumpirAlquiler: false
					});
				}
				else {
					res.send({
						interrumpirAlquiler: true
					});
	
				}	
			});
	});
	
})


//Modulo Amenidades (Propietario)
app.post('/crearAmenidad', jsonParser, (req, res) => {
	
})

app.post('/visualizarAmenidad', jsonParser, (req, res) => {
	
})

app.post('/editarAmenidad', jsonParser, (req, res) => {

})

app.post('/eliminarAmenidad', jsonParser, (req, res) => {

})

//MODULO MANTENIMIENTO (Propietario)
app.post('/visualizarMantenimientos', jsonParser, (req, res) => {

})

app.post('/actualizarMantenimientos', jsonParser, (req, res) => {

})

// MODULO DE REPORTES (propietario)

app.post('/reportes', jsonParser, (req, res) => {

})

function definirFechaInicial(periodo) {
	return periodo;
}

// MODULO PAGOS (Propietario)
app.post('/visualizarPagoAdmin', jsonParser, (req, res) => {

})

//MODULO COMUNICACION (Propietario, inquilino)
app.post('/enviarMensaje', jsonParser, (req, res) => {

})

app.post('/visualizarMsjRecibido', jsonParser, (req, res) => {

})
app.post('/visualizarMsjEnviados', jsonParser, (req, res) => {

})

//       ********** INQUILINO **********
// MODULO PAGOS (Inquilino)
app.post('/registrarPago', jsonParser, (req, res) => {

})

app.post('/visualizarPago', jsonParser, (req, res) => {

})

app.post('/editarPago', jsonParser, (req, res) => {

})

app.post('/eliminarPago', jsonParser, (req, res) => {

})
//Modulo Alquiler (Inquilino)
app.post('/solicitarAlquiler', jsonParser, (req, res) => {
	//En este módulo “Crear” va a ser dos tablas donde salga todos los aquileres disponibles y un boton de solicitar 
})

app.post('/editarAlquiler', jsonParser, (req, res) => {
	//se cambian los detalles del alquiler que tenga el usuario 
})

app.post('/interrumpirAlquiler', jsonParser, (req, res) => {
	//se va a interrumpir los alquileres en uso o cancelar las solicitudes aún pendientes
})

// MODULO MANTENIMIENTO(Inquilino)
app.post('/registrarMantenimiento', jsonParser, (req, res) => {
	
})

//       ********** ADMINITRADOR **********
// MODULO PROPIEDAD (Administrador)
app.post('/crearPropiedadAdmin', jsonParser, (req, res) => {
	
})

app.post('/visualizarPropiedadesAdmin', jsonParser, (req, res) => {
	
})

app.post('/editarPropiedadAdmin', jsonParser, (req, res) => {

})

app.post('/eliminarPropiedadAdmin', jsonParser, (req, res) => {

})

// MODULO INQUILINOS (Administrador)
app.post('/crearInquilinoAdmin', jsonParser, (req, res) => {
	//obtiene los datos de la tabla de solicitudes para aceptar y denegar, cambian las solicitudes 
})

app.post('/visualizarInquilinoAdmin', jsonParser, (req, res) => {
	//visualiza inquilinos activos 
})

app.post('/editarInquilinoAdmin', jsonParser, (req, res) => {
	//editar un inquilino  seleccione el botón va pasar a tener la funcionalidad de interrumpir el alquiler.
})

//Modulo Amenidades (Administrador)
app.post('/crearAmenidadAdmin', jsonParser, (req, res) => {
	
})

app.post('/visualizarAmenidadAdmin', jsonParser, (req, res) => {
	
})

app.post('/editarAmenidadAdmin', jsonParser, (req, res) => {

})

app.post('/eliminarAmenidadAdmin', jsonParser, (req, res) => {

})

//MODULO MANTENIMIENTO (Administrador)
app.post('/visualizarMantenimientosAdmin', jsonParser, (req, res) => {

})

app.post('/actualizarMantenimientosAdmin', jsonParser, (req, res) => {

})

app.post('/registrarMantenimientoAdmin', jsonParser, (req, res) => {
	
})

//MODULO REPORTE
app.post('/reportesAdmin', jsonParser, (req, res) => {

})

//MODULO COMUNICACION (Administrador)
app.post('/enviarMensajeAdmin', jsonParser, (req, res) => {

})

app.post('/visualizarMsjRecibidoAdmin', jsonParser, (req, res) => {

})
app.post('/visualizarMsjEnviadosAdmin', jsonParser, (req, res) => {

})

// MODULO PAGOS (Admin)
app.post('/registrarPagoAdmin', jsonParser, (req, res) => {

})

app.post('/visualizarPagoAdmin', jsonParser, (req, res) => {

})

app.post('/editarPagoAdmin', jsonParser, (req, res) => {

})

app.post('/eliminarPagoAdmin', jsonParser, (req, res) => {

})

//Modulo Alquiler (Admin)
app.post('/solicitarAlquilerAdmin', jsonParser, (req, res) => {
	//En este módulo “Crear” va a ser dos tablas donde salga todos los aquileres disponibles y un boton de solicitar 
})

app.post('/editarAlquilerAdmin', jsonParser, (req, res) => {
	//se cambian los detalles del alquiler que tenga el usuario 
})

app.post('/interrumpirAlquilerAdmin', jsonParser, (req, res) => {
	//se va a interrumpir los alquileres en uso o cancelar las solicitudes aún pendientes
})

// Los ejemplos
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
	//variables enviados por el body
	let ID_Author = datos.ID_Author;
	//------------------------------
	mssql.connect(config, function (err) {
		let request = new mssql.Request();
		let query = `SELECT ID_Libro, Titulo, Genero.Descripcio AS Genero, Descripcion, Author.Nombre AS Autor FROM Libro JOIN Author ON Author.ID_Autor = Libro.Author JOIN Genero ON Genero.ID_Genero = Libro.Genero WHERE Libro.Author = ${ID_Author}`;
		request.query(query,
			function (err, records) {
				if (err) {
					console.log(err)
				}
				if (records.recordset.length > 0) {
					res.send({
						existeUsuario: true
					});
				}
				else {
					res.send({
						existeUsuario: false
					});
				}
				// res.send(records.recordset);
			}
		);
	});
})

//Hace que en Backend se encuentre escuchando solicitudes en el puesto 8080 de la compu
app.listen(8080, () => {
	console.log('server listening on port 8080')
})