-- Crear la base de datos
USE master;
CREATE DATABASE Proyecto1;
USE Proyecto1;

-- Tabla para los estados permitidos de la propiedad
CREATE TABLE EstadosPermitidos (
    idEstado INT PRIMARY KEY,
    estado VARCHAR(20) NOT NULL
);

-- Insertar valores permitidos en EstadosPermitidos
INSERT INTO EstadosPermitidos (idEstado, estado) VALUES
(1, 'disponible'),
(2, 'ocupado'),
(3, 'en mantenimiento');

-- Tabla para los tipos de propiedad
CREATE TABLE TiposPropiedad (
    idTipoPropiedad INT PRIMARY KEY,
    tipoPropiedad VARCHAR(20) NOT NULL
);

-- Insertar valores permitidos en TiposPropiedad
INSERT INTO TiposPropiedad (idTipoPropiedad, tipoPropiedad) VALUES
(1, 'Apartamento'),
(2, 'Casa'),
(3, 'Oficina');

-- Tabla para los tipos de pago permitidos
CREATE TABLE TiposPagoPermitidos (
    idTipoPago INT PRIMARY KEY,
    tipoPago VARCHAR(20) NOT NULL
);

-- Insertar valores permitidos en TiposPagoPermitidos
INSERT INTO TiposPagoPermitidos (idTipoPago, tipoPago) VALUES
(1, 'alquiler'),
(2, 'servicios'),
(3, 'mantenimiento');

-- Tabla para los estados de pago permitidos
CREATE TABLE EstadosPagoPermitidos (
    idEstadoPago INT PRIMARY KEY,
    estadoPago VARCHAR(20) NOT NULL
);

-- Insertar valores permitidos en EstadosPagoPermitidos
INSERT INTO EstadosPagoPermitidos (idEstadoPago, estadoPago) VALUES
(1, 'pendiente'),
(2, 'realizado'),
(3, 'atrasado');

-- Tabla para los estados de mantenimiento permitidos
CREATE TABLE EstadosMantenimientoPermitidos (
    idEstadoMantenimiento INT PRIMARY KEY,
    estadoMantenimiento VARCHAR(20) NOT NULL
);

-- Insertar valores permitidos en EstadosMantenimientoPermitidos
INSERT INTO EstadosMantenimientoPermitidos (idEstadoMantenimiento, estadoMantenimiento) VALUES
(1, 'pendiente'),
(2, 'en proceso'),
(3, 'resuelto');

-- Tabla para las prioridades permitidas
CREATE TABLE PrioridadesPermitidas (
    idPrioridad INT PRIMARY KEY,
    prioridad VARCHAR(20) NOT NULL
);

-- Insertar valores permitidos en PrioridadesPermitidas
INSERT INTO PrioridadesPermitidas (idPrioridad, prioridad) VALUES
(1, 'baja'),
(2, 'media'),
(3, 'alta');

-- Tabla para la entidad Usuario
CREATE TABLE Usuario (
    cedula INT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    apellido1 VARCHAR(20) NOT NULL,
    apellido2 VARCHAR(20),
    telefono VARCHAR(15),
    correo VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla para la entidad Propietario
CREATE TABLE Propietario (
    cedula INT PRIMARY KEY,
    FOREIGN KEY (cedula) REFERENCES Usuario(cedula) ON DELETE CASCADE
);

-- Tabla para la entidad Inquilino
CREATE TABLE Inquilino (
    cedula INT PRIMARY KEY,
    FOREIGN KEY (cedula) REFERENCES Usuario(cedula) ON DELETE CASCADE
);

-- Tabla para la entidad Propiedad
CREATE TABLE Propiedad (
    idPropiedad INT PRIMARY KEY,
    direccion VARCHAR(90) NOT NULL,
    idTipoPropiedad INT,
    numeroHabitaciones INT,
    tamanoMetros INT,
    descripcion VARCHAR(90),
    estadoActual INT,
    precioAlquiler INT,
    cedulaPropietario INT,
    FOREIGN KEY (estadoActual) REFERENCES EstadosPermitidos(idEstado),
    FOREIGN KEY (idTipoPropiedad) REFERENCES TiposPropiedad(idTipoPropiedad),
    FOREIGN KEY (cedulaPropietario) REFERENCES Propietario(cedula)
);

-- Tabla para tipos de gastos adicionales
CREATE TABLE TiposGastosAdicionales (
    idTipoGasto INT PRIMARY KEY,
    tipoGasto VARCHAR(20) NOT NULL
);

-- Insertar valores permitidos en TiposGastosAdicionales
INSERT INTO TiposGastosAdicionales (idTipoGasto, tipoGasto) VALUES
(1, 'servicios'),
(2, 'comunidad');


-- Tabla para relaci�n de gastos adicionales de propiedades
CREATE TABLE GastosAdicionalesPropiedad (
    idPropiedad INT,
    idTipoGasto INT,
    monto INT NOT NULL,
    PRIMARY KEY (idPropiedad),
    FOREIGN KEY (idPropiedad) REFERENCES Propiedad(idPropiedad) ON DELETE CASCADE,
    FOREIGN KEY (idTipoGasto) REFERENCES TiposGastosAdicionales(idTipoGasto) ON DELETE CASCADE
);

-- Tabla para la entidad Documento
CREATE TABLE Documento (
    cedulaInquilino INT,
    tipo VARCHAR(10) NOT NULL,
    archivo VARBINARY(MAX),
    FOREIGN KEY (cedulaInquilino) REFERENCES Inquilino(cedula) ON DELETE CASCADE
);

-- Tabla para la entidad Amenidades
CREATE TABLE Amenidades (
    idAmenidad INT PRIMARY KEY,
    tipoAmenidad VARCHAR(12),
    descripcion VARCHAR(100) NOT NULL,
    costoUso INT NOT NULL,
    estado VARCHAR(20) NOT NULL,
    estadoActual INT,
    cedulaPropietario INT NOT NULL,
    FOREIGN KEY (estadoActual) REFERENCES EstadosPermitidos(idEstado) ON DELETE CASCADE, 
    FOREIGN KEY (cedulaPropietario) REFERENCES Propietario(cedula) ON DELETE CASCADE
);

DROP TABLE Amenidades
-- Tabla para la entidad Alquiler
CREATE TABLE Alquiler ( 
    idAlquiler INT IDENTITY(1,1) PRIMARY KEY,
    cedulaUsuario INT,
    fechaInicio DATE NOT NULL,
    fechaFin DATE,
    FOREIGN KEY (cedulaUsuario) REFERENCES Inquilino(cedula) ON DELETE CASCADE
);

CREATE TABLE alquilerPropiedad (
    idPropiedad INT,
    idAlquiler INT,
    FOREIGN KEY (idPropiedad) REFERENCES Propiedad(idPropiedad) ON DELETE CASCADE,
    FOREIGN KEY (idAlquiler) REFERENCES Alquiler(idAlquiler) ON DELETE CASCADE
);

CREATE TABLE alquilerAmenidades (
    idAmenidad INT PRIMARY KEY,
    idAlquiler INT,
    FOREIGN KEY (idAlquiler) REFERENCES Alquiler(idAlquiler) ON DELETE CASCADE,
    FOREIGN KEY (idAmenidad) REFERENCES Amenidades(idAmenidad) ON DELETE CASCADE,
); 

-- Tabla para la entidad Pagos
CREATE TABLE Pagos (
    idPago INT PRIMARY KEY,
    cedulaInquilino INT,
    fechaPago DATE NOT NULL,
    monto INT NOT NULL,
    tipoPago INT,
    estadoPago INT,
    metodoPago VARCHAR(20),
    FOREIGN KEY (cedulaInquilino) REFERENCES Inquilino(cedula) ON DELETE CASCADE,
    FOREIGN KEY (tipoPago) REFERENCES TiposPagoPermitidos(idTipoPago),
    FOREIGN KEY (estadoPago) REFERENCES EstadosPagoPermitidos(idEstadoPago)
);

-- Tabla para la entidad Proveedores
CREATE TABLE Proveedores (
    idProveedor INT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    primerApellido VARCHAR(20) NOT NULL,
    segundoApellido VARCHAR(20),
    especialidad VARCHAR(60) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(15) NOT NULL
);

INSERT INTO Proveedores (idProveedor, nombre, primerApellido, segundoApellido, correo, telefono, especialidad) VALUES
(1, 'Juan', 'Perez', 'Garcia', 'juanperez@example.com', '123456789', 'Electricista'),
(2, 'Maria', 'Gomez', 'Lopez', 'mariagomez@example.com', '987654321', 'Jardinero'),
(3, 'Carlos', 'Martinez', 'Fernandez', 'carlosmartinez@example.com', '555666777', 'Carpintero'),
(4, 'Ana', 'Ruiz', 'Sanchez', 'anaruiz@example.com', '111222333', 'Plomero'),
(5, 'Pedro', 'Diaz', 'Gutierrez', 'pedrodiaz@example.com', '444555666', 'Pintor');

-- Tabla para la entidad Solicitud de Mantenimiento
CREATE TABLE SolicitudMantenimiento (
    idSolicitud INT PRIMARY KEY,
    idPropiedad INT,
    descripcionProblema VARCHAR(100) NOT NULL,
    idProveedor INT,
    fechaSolicitud DATE NOT NULL,
    estado INT,
    idPrioridad INT,
    costoMantenimiento INT,
    FOREIGN KEY (idPropiedad) REFERENCES Propiedad(idPropiedad) ON DELETE CASCADE,
    FOREIGN KEY (idProveedor) REFERENCES Proveedores(idProveedor),
    FOREIGN KEY (estado) REFERENCES EstadosMantenimientoPermitidos(idEstadoMantenimiento),
    FOREIGN KEY (idPrioridad) REFERENCES PrioridadesPermitidas(idPrioridad)
);

-- Tabla para la entidad FotoPropiedad
CREATE TABLE FotoPropiedad (
    idPropiedad INT,
    tipo VARCHAR(10) NOT NULL,
    archivo VARBINARY(MAX),
    FOREIGN KEY (idPropiedad) REFERENCES Propiedad(idPropiedad) ON DELETE CASCADE
);

-- Tabla para la entidad Comunicacion
CREATE TABLE Comunicacion (
    cedulaEmisor INT,
    cedulaReceptor INT,
    fechaMensaje DATE,
    horaMensaje TIME,
    contenido VARCHAR(100),
    estado VARCHAR(20),
    FOREIGN KEY (cedulaEmisor) REFERENCES Usuario(cedula) ON DELETE CASCADE,
    FOREIGN KEY (cedulaReceptor) REFERENCES Usuario(cedula) ON DELETE NO ACTION 
);


-- Tabla para la entidad FotosProblema
CREATE TABLE FotosProblema (
    idSolicitud INT,
    foto VARBINARY(MAX),
    FOREIGN KEY (idSolicitud) REFERENCES SolicitudMantenimiento(idSolicitud) ON DELETE CASCADE
);

-- Tabla para la entidad ComentariosInquilino
CREATE TABLE ComentariosInquilino (
    idComentario INT PRIMARY KEY,
    comentario VARCHAR(300) NOT NULL,
    idSolicitud INT, 
    FOREIGN KEY (idSolicitud) REFERENCES SolicitudMantenimiento(idSolicitud) ON DELETE CASCADE
);

CREATE TABLE solicitudesAlquierPropiedad (
    idPropiedad INT, 
    cedula INT,
    estadoSolicitud VARCHAR(50),
    fechaSolicitud DATE, 
    fechaInicio DATE,
    FechaFin DATE,
    FOREIGN KEY (idPropiedad) REFERENCES Propiedad(idPropiedad) ON DELETE CASCADE,
    FOREIGN KEY (cedula) REFERENCES Inquilino(cedula) ON DELETE CASCADE,
)


CREATE TABLE ingresosUsuario (
    cedulaPropietario INT,
    ingreso INT,  
    tipo INT,
    FOREIGN KEY (cedulaPropietario) REFERENCES Usuario(cedula) ON DELETE CASCADE 
)


CREATE TABLE tiposIngresosUsuario (
    idTipoPago INT PRIMARY KEY,
    tipoPago VARCHAR(20) NOT NULL
);

-- Insertar valores permitidos en tiposIngresosUsuario
INSERT INTO tiposIngresosUsuario (idTipoPago, tipoPago) VALUES
(1, 'alquiler'),
(2, 'servicios'),
(3, 'comunidad');


CREATE TABLE gastoUsuario (
    cedulaPropietario INT,
    gasto INT,  
    tipo INT,
    FOREIGN KEY (cedulaPropietario) REFERENCES Usuario(cedula) ON DELETE CASCADE 
)

CREATE TABLE tipoGastoUsuario (
    idTipoPago INT PRIMARY KEY,
    tipoPago VARCHAR(20) NOT NULL
);

-- Insertar valores permitidos en tipoGastoUsuario
INSERT INTO tipoGastoUsuario (idTipoPago, tipoPago) VALUES
(1, 'comunidad'),
(2, 'servicios'),
(3, 'mantenimiento');

CREATE TABLE admin (
    idUsuario INT PRIMARY KEY,
    correo varchar(100) UNIQUE, 
)



--Ejmeplos *** hay que actualizarlo según los cambios
-- Insertar datos de ejemplo en la base de datos Proyecto1

-- -- Insertar usuarios
-- INSERT INTO Usuario (cedula, nombre, apellido1, apellido2, telefono, correo) 
-- VALUES 
-- --(123456789, 'Juan', 'Perez', 'Garcia', '5551234567', 'juan@example.com'),
-- (987654321, 'Maria', 'Gomez', 'Lopez', '5559876543', 'maria@example.com');

-- -- Insertar propietarios e inquilinos
-- INSERT INTO Propietario (cedula) VALUES (123456789);
--INSERT INTO Inquilino (cedula) VALUES (987654321);


-- -- Insertar propiedades
-- INSERT INTO Propiedad (idPropiedad, direccion, idTipoPropiedad, numeroHabitaciones, tamanoMetros, descripcion, estadoActual, precioAlquiler, cedulaPropietario) 
-- VALUES (1, 'Calle Principal 123', 1, 2, 100, 'Apartamento acogedor', 1, 1000, 123456789);


-- -- Insertar gastos adicionales de propiedad
-- INSERT INTO GastosAdicionalesPropiedad (idPropiedad, idTipoGasto, monto) 
-- VALUES (1, 1, 50), (1, 3, 80);



-- -- Insertar solicitud de mantenimiento
-- INSERT INTO SolicitudMantenimiento (idSolicitud, idPropiedad, descripcionProblema, idProveedor, fechaSolicitud, estado, idPrioridad, costoMantenimiento) 
-- VALUES (1, 1, 'Fuga de agua en el bano', 1, '2024-05-25', 1, 2, 80);

-- -- Insertar amenidades
-- INSERT INTO Amenidades (idAmenidad, descripcion, costoUso, estado) 
-- VALUES (1, 'Piscina', 10, 'Disponible');

-- Seleccionar todos los usuarios
SELECT * FROM Usuario;

-- Seleccionar todas las propiedades
SELECT * FROM Propiedad;

-- Seleccionar todos los tipos de propiedad
SELECT * FROM TiposPropiedad;

-- Seleccionar todos los gastos adicionales de una propiedad espec�fica
SELECT * FROM GastosAdicionalesPropiedad WHERE idPropiedad = 1;

-- Seleccionar todas las solicitudes de mantenimiento
SELECT * FROM SolicitudMantenimiento;

-- Seleccionar todos los proveedores
SELECT * FROM Proveedores;

-- Seleccionar todas las amenidades
SELECT * FROM Amenidades;


--- PROCEDURE

-- EXISTEN 

-- existeUsuario / obtenerInquilino
CREATE PROCEDURE obtenerAdmin(@idUsuario int)
AS
BEGIN
    (SELECT * FROM admin WHERE idUsuario= @idUsuario)
END
-- exec obtenerAdmin 1; 

-- existeInquilinoBD
CREATE PROCEDURE obtenerInquilino (@cedula int)
AS
BEGIN
    (SELECT * FROM Inquilino WHERE cedula = @cedula)
END

-- EXEC obtenerInquilino 987654321;

--existePropietario

CREATE PROCEDURE obtenerPropietario (@cedula int)
AS
BEGIN
    SELECT * FROM Propietario WHERE cedula = @cedula
END

--EXEC obtenerPropietario 123;

SELECT * FROM Propietario

--existePropiedad(idPropiedad)

CREATE PROCEDURE obtenerPropiedad (@idPropiedad int)
AS
BEGIN
    SELECT idPropiedad, idTipoPropiedad, tamanoMetros, descripcion, precioAlquiler, direccion, numeroHabitaciones, estadoActual FROM Propiedad WHERE idPropiedad = @idPropiedad
END

--EXEC obtenerPropiedad 1;

CREATE PROCEDURE obtenerPropiedadPropietario (@idPropiedad int, @cedulaUsuario int)
AS
BEGIN
    SELECT * FROM Propiedad 
    WHERE idPropiedad = @idPropiedad 
        AND cedulaPropietario = @cedulaUsuario
END

-- EXEC obtenerPropiedadPropietario 1,123456789

-- existeInquilinosPropietario / obtenerInquilinosPropietario

CREATE PROCEDURE obtenerInquilinosPropietarioP (@cedulaUsuario int)
AS
BEGIN
    SELECT 
        Inquilino.cedula, 
        Usuario.nombre, 
        Usuario.apellido1, 
        Usuario.apellido2, 
        Usuario.telefono, 
        Usuario.correo, 
        Propiedad.idPropiedad, 
        Alquiler.fechaInicio, 
        Alquiler.fechaFin 
    FROM Inquilino  
    JOIN Usuario 
    ON Inquilino.cedula = Usuario.cedula 
    JOIN Alquiler 
    ON Alquiler.cedulaUsuario = Inquilino.cedula 
    JOIN alquilerPropiedad
    ON Alquiler.idAlquiler = alquilerPropiedad.idAlquiler
    JOIN Propiedad 
    ON alquilerPropiedad.idPropiedad = Propiedad.idPropiedad
    WHERE Propiedad.cedulaPropietario = @cedulaUsuario
END

Inquilinos amenidad 
CREATE PROCEDURE obtenerInquilinosPropietarioA (@cedulaUsuario int)
AS
BEGIN
    SELECT 
        Inquilino.cedula, 
        Usuario.nombre, 
        Usuario.apellido1, 
        Usuario.apellido2, 
        Usuario.telefono, 
        Usuario.correo, 
        Propiedad.idPropiedad, 
        Alquiler.fechaInicio, 
        Alquiler.fechaFin 
    FROM Inquilino  
    JOIN Usuario 
    ON Inquilino.cedula = Usuario.cedula 
    JOIN Alquiler 
    ON Alquiler.cedulaUsuario = Inquilino.cedula 
    JOIN alquilerAmenidades
    ON Alquiler.idAlquiler = alquilerAmenidades.idAlquiler
    JOIN Amenidades 
    ON alquilerAmenidades.idAmenidad = Amenidades.idAmenidad
    WHERE Amenidades. = @cedulaUsuario
END



-- EXEC obtenerInquilinosPropietarioP 123456789;

-- existeSolicitudesPropietario/ obtenerSolicitudesP()

CREATE PROCEDURE obtenerSolicitudesManteProp (@cedulaUsuario int)
AS
BEGIN
    SELECT idSolicitud, Propiedad.idPropiedad, descripcionProblema, fechaSolicitud, estadoMantenimiento, prioridad, Proveedores.idProveedor, nombre, primerApellido, segundoApellido, especialidad, telefono FROM SolicitudMantenimiento JOIN Propiedad ON SolicitudMantenimiento.idPropiedad = Propiedad.idPropiedad JOIN PrioridadesPermitidas ON SolicitudMantenimiento.idPrioridad = PrioridadesPermitidas.idPrioridad JOIN Proveedores ON SolicitudMantenimiento.idProveedor = Proveedores.idProveedor JOIN EstadosMantenimientoPermitidos ON idEstadoMantenimiento = SolicitudMantenimiento.estado WHERE Propiedad.cedulaPropietario = @cedulaUsuario
END

--EXEC obtenerSolicitudesManteProp 123456789;

-- existeSolicitudMantenimiento

CREATE PROCEDURE obtenerSolicitudesMantenimiento (@idSolicitud int)
AS
BEGIN
    SELECT * FROM SolicitudMantenimiento WHERE idSolicitud = @idSolicitud
END

--EXEC obtenerSolicitudesMantenimiento 1;

-- existenReportesPropietario / No se probó


-- CREATE PROCEDURE obtenerReportesPropietario (@cedulaUsuario int, @fechaInicial date, @fechaFinal date)
-- AS
-- BEGIN
--     SELECT idPago, Alquiler.cedulaUsuario, Pagos.fechaPago, Pagos.monto, TiposPagoPermitidos.tipoPago, EstadosPagoPermitidos.estadoPago, Pagos.metodoPago 
--     FROM Pagos 
--     JOIN TiposPagoPermitidos 
--     ON Pagos.tipoPago = TiposPagoPermitidos.idTipoPago 
--     JOIN EstadosPagoPermitidos 
--     ON EstadosPagoPermitidos.idEstadoPago  = Pagos.estadoPago 
--     JOIN Alquiler 
--     ON Pagos.cedulaInquilino = Alquiler.cedulaUsuario 
--     JOIN Propiedad 
--     ON alquilerPropiedad.idPropiedad = Propiedad.idPropiedad
--     JOIN Amenidades
--     ON alquilerAmenidades.idAmenidad = Amenidades.idAmenidad
--     WHERE (Propiedad.cedulaPropietario = @cedulaUsuario) AND (Pagos.fechaPago BETWEEN @fechaInicial AND @fechaFinal)
-- END



-- --existeReportesInquilino / No se probó


-- CREATE PROCEDURE obtenerReportesInquilino (@cedulaUsuario int, @fechaInicial date, @fechaFinal date)
-- AS
-- BEGIN
--     SELECT * FROM Pagos 
--     WHERE (Pagos.cedulaInquilino = @cedulaUsuario) AND (Pagos.fechaPago BETWEEN @fechaInicial AND @fechaFinal)
-- END

-- EXEC obtenerReportesInquilino 123, '2024-01-01', '2025-01-01' 

--existePagoId

CREATE PROCEDURE obtenerPago (@idPago int)
AS
BEGIN
    SELECT * FROM Pagos WHERE idPago= @idPago
END

--EXEC obtenerPago 1;

-- existeAlquiler

CREATE PROCEDURE obtenerAlquilerUsuario (@idPropiedad int, @cedulaUsuario int)
AS
BEGIN
    SELECT * FROM Alquiler WHERE idRecurso = @idPropiedad AND cedulaUsuario = @cedulaUsuario
END

-- EXEC obtenerAlquilerUsuario 1, 123; 

-- propiedad/Amenidad Disponible

CREATE PROCEDURE obtenerRecurso (@idRecurso int, @fechaInicio date, @fechaFin date)
AS
BEGIN
    SELECT * FROM Alquiler WHERE (idRecurso = @idRecurso) AND ((@fechaInicio BETWEEN fechaInicio AND fechaFin) OR (@fechaFin BETWEEN fechaInicio AND fechaFin))
END

-- obtenerAdmin

CREATE PROCEDURE obtenerAdmin (@idUsuario INT)
AS
BEGIN
    SELECT * FROM admin WHERE idUsuario = @idUsuario;
END

--EXEC obtenerAdmin 1123;

-- insertarAdmin 

CREATE PROCEDURE insertarAdmin (@idUsuario INT, @correo varchar(100)) 
AS
BEGIN
    INSERT INTO admin (idUsuario, correo) VALUES (@idUsuario, @correo)  
END

--EXEC insertarAdmin 1123,'example1@gmail.com' 

-- insertarUsuario(Inquilino/Propietario) 

CREATE PROCEDURE insertarInquilino (@cedula int, @nombre varchar(20), @apellido1 varchar(20), @apellido2 varchar(20), @telefono varchar(15), @correo varchar(100)) 
AS
BEGIN
    INSERT INTO Usuario (cedula, nombre, apellido1, apellido2, telefono, correo) VALUES (@cedula, @nombre, @apellido1, @apellido2, @telefono, @correo)
    INSERT INTO Inquilino (cedula) VALUES (@cedula)
END


CREATE PROCEDURE insertarPropietario (@cedula int, @nombre varchar(20), @apellido1 varchar(20), @apellido2 varchar(20), @telefono varchar(15), @correo varchar(100)) 
AS
BEGIN
    INSERT INTO Usuario (cedula, nombre, apellido1, apellido2, telefono, correo) VALUES (@cedula, @nombre, @apellido1, @apellido2, @telefono, @correo)
    INSERT INTO Propietario (cedula) VALUES (@cedula) 
END

-- exec insertarInquilino 7, 'Kiki', 'A', 'B', '5769879', 'example'
-- exec insertarPropietario 15, 'Kiki', 'A', 'B', '5769879', 'example1'

--insertarPropiedad

CREATE PROCEDURE insertarPropiedad(@idPropiedad INT, @direccion VARCHAR(90), @idTipoPropiedad INT, @numeroHabitaciones INT, @tamanoMetros INT, @descripcion VARCHAR(90), @estadoActual INT, @precioAlquiler INT, @cedulaPropietario INT) 
AS
BEGIN
    INSERT INTO Propiedad (idPropiedad, direccion, idTipoPropiedad, numeroHabitaciones, tamanoMetros, cedulaPropietario,descripcion, estadoActual, precioAlquiler) 
        VALUES (@idPropiedad, @direccion, @idTipoPropiedad, @numeroHabitaciones, @tamanoMetros,@cedulaPropietario, @descripcion, @estadoActual, @precioAlquiler) 
END

-- EXEC insertarPropiedad  23, 'Cartago', 1, 4, 200, 'Blanca', 1, 200, 15
-- EXEC obtenerPropiedadPropietario 23,15

SELECT * FROM Propiedad
--insertarAlquiler()

CREATE PROCEDURE insertarAlquilerProp(@cedulaUsuario INT, @fechaInicio DATE, @fechaFin DATE, @idPropiedad INT)
AS
BEGIN
    DECLARE @idAlquiler int
    INSERT INTO Alquiler (cedulaUsuario, fechaInicio, fechaFin) VALUES (@cedulaUsuario, @fechaInicio, @fechaFin)
    SET @idAlquiler = (SELECT TOP 1 (idAlquiler) AS nuevoAlquiler FROM Alquiler ORDER BY idAlquiler DESC )
    INSERT INTO alquilerPropiedad (idPropiedad,idAlquiler) VALUES (@idPropiedad, @idAlquiler)
END

CREATE PROCEDURE insertarAlquilerAmen(@cedulaUsuario INT, @fechaInicio DATE, @fechaFin DATE, @idAmenidad INT)
AS
BEGIN
    DECLARE @idAlquiler int
    INSERT INTO Alquiler (cedulaUsuario, fechaInicio, fechaFin) VALUES (@cedulaUsuario, @fechaInicio, @fechaFin)
    SET @idAlquiler = (SELECT TOP 1 (idAlquiler) AS nuevoAlquiler FROM Alquiler ORDER BY idAlquiler DESC )
    INSERT INTO alquilerAmenidades (idAmenidad, idAlquiler) VALUES (@idAmenidad, @idAlquiler)
END

-- EXEC insertarAlquilerProp 7, '2024/01/01', '2025/01/01', 1 
-- EXEC insertarAlquilerProp 4, '2024/01/01', '2025/01/01', 23 

--insertarPago

CREATE PROCEDURE insertarPago(@idPago INT, @cedulaUsuario INT, @fechaPago DATE, @monto INT, @tipoPago INT, @estadoPago INT, @metodoPago VARCHAR(20))
AS
BEGIN
    INSERT INTO Pagos (idPago,cedulaInquilino,fechaPago,monto,tipoPago,estadoPago, metodoPago) 
    VALUES (@idPago, @cedulaUsuario, @fechaPago, @monto, @tipoPago, @estadoPago, @metodoPago)
END

--EXEC insertarPago 2, 7, '2024/01/01', 100, 1, 1, 'tarjeta';

--insertarMantenimiento(mantenimiento)

CREATE PROCEDURE insertarMantenimiento(@idSolicitud INT, @idPropiedad INT, @descripcionProblema VARCHAR(100),@idProveedor INT, @fechaSolicitud DATE, @estado INT, @idPrioridad INT, @costoMantenimiento INT)
AS
BEGIN
    INSERT INTO SolicitudMantenimiento (idSolicitud, idPropiedad, descripcionProblema, idProveedor, fechaSolicitud, estado, idPrioridad, costoMantenimiento ) 
    VALUES (@idSolicitud, @idPropiedad, @descripcionProblema, @idProveedor, @fechaSolicitud, @estado, @idPrioridad, @costoMantenimiento)  
END

-- EXEC insertarMantenimiento 45, 23, 'ejemplo descripcion ',1, '2024/01/01', 1, 1, 1000 

---	InsertarSolicitudAlquiler

CREATE PROCEDURE insertarSolicitudAlquilerP(@idPropiedad INT, @cedula INT, @fechaSolicitud DATE, @fechaInicio DATE, @FechaFin DATE)
AS
BEGIN
    DECLARE @estadoSolicitud VARCHAR(50)
    SET @estadoSolicitud  = 'PENDIENTE'
    INSERT INTO solicitudesAlquierPropiedad (idPropiedad, cedula, estadoSolicitud, fechaSolicitud, fechaInicio, FechaFin) 
    VALUES (@idPropiedad, @cedula, @estadoSolicitud, @fechaSolicitud, @fechaInicio, @FechaFin)  
END


CREATE PROCEDURE insertarSolicitudAlquilerA(@idAmenidad INT, @cedula INT, @fechaSolicitud DATE, @fechaInicio DATE, @FechaFin DATE)
AS
BEGIN
    DECLARE @estadoSolicitud VARCHAR(50)
    SET @estadoSolicitud  = 'Pendiente'
    INSERT INTO solicitudesAlquierAmenidad (idAmenidad, cedula, estadoSolicitud, fechaSolicitud, fechaInicio, FechaFin) 
    VALUES (@idAmenidad, @cedula, @estadoSolicitud, @fechaSolicitud, @fechaInicio, @FechaFin)  
END

-- InsertarAmenidades
CREATE PROCEDURE insertarAmenidades (@idAmenidad INT, @tipoAmenidad VARCHAR(12), @descripcion VARCHAR(100), @costoUso INT, @estado int)
AS
BEGIN
    INSERT INTO Amenidades(idAmenidad, tipoAmenidad, descripcion, costoUso, estado) 
    VALUES (@idAmenidad, @tipoAmenidad, @descripcion, @costoUso, @estado)  
END

-- EXEC insertarAmenidades 2, 'cocina', 'dos hornos', 100, 1 

--agregarComunicacion(valores)

CREATE PROCEDURE agregarComunicacion (@cedulaUsuario INT,@cedulaReceptor INT, @fechaMensaje DATE, @horaMensaje TIME, @contenido varchar(100))
AS
BEGIN
    DECLARE @estado VARCHAR(20)
    SET @estado = 'No Leído'
    INSERT INTO Comunicacion (cedulaEmisor, cedulaReceptor, fechaMensaje, horaMensaje, contenido, estado) 
    VALUES (@cedulaUsuario, @cedulaReceptor, @fechaMensaje, @horaMensaje, @contenido, @estado)  
END


--obtenerPropiedades
CREATE PROCEDURE obtenerPropiedad (@cedulaUsuario INT)
AS
BEGIN
    SELECT idPropiedad, idTipoPropiedad, tamanoMetros, descripcion, precioAlquiler, direccion, numeroHabitaciones, estado 
    FROM Propiedad 
    JOIN EstadosPermitidos 
    ON Propiedad.estadoActual = EstadosPermitidos.idEstado 
    WHERE cedulaPropietario = @cedulaUsuario
END

--obtenerMsjRecibidos

CREATE PROCEDURE obtenerMsjRecibidos (@cedulaUsuario INT)
AS
BEGIN
    SELECT cedulaEmisor, fechaMensaje, horaMensaje, contenido FROM Comunicacion WHERE cedulaReceptor = @cedulaUsuario
END

--EXEC obtenerMsjRecibidos 123

-- obtenerMsjEnviados

CREATE PROCEDURE obtenerMsjEnviados (@cedulaUsuario INT)
AS
BEGIN
    SELECT cedulaReceptor, fechaMensaje, horaMensaje, contenido, estado FROM Comunicacion WHERE cedulaEmisor = @cedulaUsuario  
END

-- cambiarPropiedad
CREATE PROCEDURE cambiarPropiedad (@idPropiedad INT, @direccion VARCHAR(90), @idTipoPropiedad INT, @numeroHabitaciones INT, @tamanoMetros INT, @descripcion VARCHAR(90), @estadoActual INT, @precioAlquiler INT, @cedulaPropietario INT)
AS
BEGIN
    UPDATE Propiedad SET direccion = @direccion, idTipoPropiedad= @idTipoPropiedad, numeroHabitaciones = @numeroHabitaciones, tamanoMetros = @tamanoMetros, descripcion = @descripcion, estadoActual = @estadoActual, precioAlquiler = @precioAlquiler WHERE cedulaPropietario = @cedulaPropietario AND idPropiedad = @idPropiedad 
END

--cambiarPropiedad 23, 'cartagoooo', '2', 4, 200, 'Blanca', 2, 400, 15

SELECT * FROM Propiedad

CREATE PROCEDURE marcarMsjLeidos (@cedulaUsuario INT)
AS
BEGIN 
    UPDATE Comunicacion SET estado = 'Leído' WHERE cedulaReceptor = @cedulaUsuario
END

--EXEC marcarMsjLeidos 99

-- cambiarInquilino

CREATE PROCEDURE cambiarInquilino (@cedulaInquilino int, @nombre VARCHAR(20), @apellido1 VARCHAR(20), @apellido2 VARCHAR(20), @telefono VARCHAR(15), @correo VARCHAR(100))
AS
BEGIN 
    UPDATE Usuario SET nombre = @nombre, apellido1= @apellido1, apellido2 = @apellido2, telefono = @telefono, correo = @correo WHERE cedula = @cedulaInquilino
END

-- cambiarSolicitudAlquiler (aceptar/ denegar)

CREATE PROCEDURE cambiarSolicitudAlquilerP(@idPropiedad INT, @estadoSolicitud VARCHAR(50))
AS
BEGIN
    UPDATE solicitudesAlquierPropiedad SET estadoSolicitud = @estadoSolicitud WHERE idPropiedad = @idPropiedad
END

CREATE PROCEDURE cambiarSolicitudAlquilerA(@idAmenidad INT, @estadoSolicitud VARCHAR(50))
AS
BEGIN
    UPDATE solicitudesAlquierAmenidad SET estadoSolicitud = @estadoSolicitud WHERE idAmenidad = @idAmenidad
END

--EXEC insertarSolicitudAlquilerP 23,7, '2024/05/06', '2024/07/01', '2025/07/01'

-- cambiarEstadoSolMante()

CREATE PROCEDURE cambiarEstadoSolMante (@idSolicitud INT, @estado INT)
AS
BEGIN
    UPDATE SolicitudMantenimiento SET estado = @estado WHERE idSolicitud = @idSolicitud
END

-- actualizarPropiedadAlquiler
CREATE PROCEDURE actualizarPropiedadAlquiler (@idPropiedad INT)
AS
BEGIN
    UPDATE Propiedad SET estadoActual = 2 WHERE idPropiedad = @idPropiedad
END

--eliminar propiedad
CREATE PROCEDURE eliminarPropiedad (@idPropiedad INT)
AS
BEGIN
    DELETE FROM Propiedad WHERE idPropiedad = @idPropiedad
END

EXEC eliminarPropiedad 456

SELECT * FROM solicitudesAlquierAmenidad
SELECT * FROM Alquiler
SELECT * FROM alquilerAmenidades

--insertar gasto
--insertar ingreso
--obtener gastosUsuario
--obtener ingresosUsuario