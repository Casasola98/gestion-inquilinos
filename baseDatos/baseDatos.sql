-- Crear la base de datos
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
(2, 'comunidad'),
(3, 'mantenimiento');

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
    estado VARCHAR(20) NOT NULL
);

-- Tabla para la entidad Alquiler
CREATE TABLE Alquiler ( 
    idAlquiler INT IDENTITY(1,1) PRIMARY KEY,
    cedulaUsuario INT,
    fechaInicio DATE NOT NULL,
    fechaFin DATE,
    FOREIGN KEY (cedulaUsuario) REFERENCES Inquilino(cedula) ON DELETE CASCADE,
);

CREATE TABLE alquilerPropiedad (
    idPropiedad INT,
    idAlquiler INT,
    FOREIGN KEY (idPropiedad) REFERENCES Propiedad(idPropiedad) ON DELETE CASCADE,
    FOREIGN KEY (idAlquiler) REFERENCES Alquiler(idAlquiler) ON DELETE CASCADE,
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

-- Tabla para la entidad Trabajos
CREATE TABLE Trabajos (
    idProveedor INT,
    idTrabajo VARCHAR(20) PRIMARY KEY,
    idSolicitud INT, 
    descripcion VARCHAR(300) NOT NULL,
    FOREIGN KEY (idProveedor) REFERENCES Proveedores(idProveedor),
    FOREIGN KEY (idSolicitud) REFERENCES SolicitudMantenimiento(idSolicitud) ON DELETE CASCADE
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

CREATE TABLE solicitudesAlquier (
    idPropiedad INT, 
    idUsuario INT,
    estadoSolicitud INT,
    fechaSolicitud DATE, 
    fechaInicio DATE,
    FechaFin DATE,
    FOREIGN KEY (idPropiedad) REFERENCES Propiedad(idPropiedad) ON DELETE CASCADE,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(cedula) ON DELETE CASCADE,
)

-- Esto aún no estoy segura

CREATE TABLE ingresosUsuario (
    idUsuario INT,
    ingreso INT,  
    FOREIGN KEY (idUsuario) REFERENCES Usuario(cedula) ON DELETE CASCADE 
)

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

-- existeUsuario
CREATE PROCEDURE obtenerUsuario(@cedula int)
AS
BEGIN
    (SELECT * FROM Usuario WHERE cedula= @cedula)
END

-- exec obtenerUsuario 987654321; 

-- existeInquilinoBD
CREATE PROCEDURE obtenerInquilino (@cedula int)
AS
BEGIN
    (SELECT * FROM Inquilino WHERE cedula = @cedula)
END

-- exec obtenerInquilino 987654321;

--existePropietario

CREATE PROCEDURE obtenerPropietario (@cedula int)
AS
BEGIN
    SELECT * FROM Propietario WHERE cedula = @cedula
END

--EXEC obtenerPropietario 123;

--existePropiedad(idPropiedad)

CREATE PROCEDURE obtenerPropiedad (@idPropiedad int)
AS
BEGIN
    SELECT * FROM Propiedad WHERE idPropiedad = @idPropiedad
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

-- existeInquilinosPropietario

CREATE PROCEDURE obtenerInquilinosPropietario (@cedulaUsuario int)
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
    JOIN Propiedad ON Alquiler.idRecurso = Propiedad.idPropiedad
    WHERE Propiedad.cedulaPropietario = @cedulaUsuario
END

-- EXEC obtenerInquilinosPropietario 123;

-- existeSolicitudesPropietario

CREATE PROCEDURE obtenerSolicitudesManteProp (@cedulaUsuario int)
AS
BEGIN
    SELECT * FROM SolicitudMantenimiento 
    JOIN Propiedad 
    ON Propiedad.idPropiedad = SolicitudMantenimiento.idPropiedad 
    WHERE cedulaPropietario = @cedulaUsuario
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

CREATE PROCEDURE obtenerReportesPropietario (@cedulaUsuario int, @fechaInicial date, @fechaFinal date)
AS
BEGIN
    SELECT * FROM Pagos 
    JOIN Alquiler 
    ON Pagos.cedulaInquilino = Alquiler.cedulaUsuario 
    JOIN Propiedad 
    ON Alquiler.idRecurso = Propiedad.idPropiedad 
    WHERE (Propiedad.cedulaPropietario = @cedulaUsuario)
         AND (Pagos.fechaPago BETWEEN @fechaInicial AND @fechaFinal)
END

EXEC obtenerReportesPropietario 123, '2024-01-01', '2025-01-01' 

--existeReportesInquilino / No se probó


CREATE PROCEDURE obtenerReportesInquilino (@cedulaUsuario int, @fechaInicial date, @fechaFinal date)
AS
BEGIN
    SELECT * FROM Pagos 
    WHERE (Pagos.cedulaInquilino = @cedulaUsuario) AND (Pagos.fechaPago BETWEEN @fechaInicial AND @fechaFinal)
END

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

EXEC insertarAdmin 1123,'example1@gmail.com' 

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

CREATE PROCEDURE insertarPropiedad( @idPropiedad INT, @direccion VARCHAR(90), @idTipoPropiedad INT, @numeroHabitaciones INT, @tamanoMetros INT, @descripcion VARCHAR(90), @estadoActual INT, @precioAlquiler INT, @cedulaPropietario INT) 
AS
BEGIN
    INSERT INTO Propiedad (idPropiedad, direccion, idTipoPropiedad, numeroHabitaciones, tamanoMetros, cedulaPropietario,descripcion, estadoActual, precioAlquiler) 
        VALUES (@idPropiedad, @direccion, @idTipoPropiedad, @numeroHabitaciones, @tamanoMetros,@cedulaPropietario, @descripcion, @estadoActual, @precioAlquiler) 
END

-- EXEC insertarPropiedad  23, 'Cartago', 1, 4, 200, 'Blanca', 1, 200, 15
-- EXEC obtenerPropiedadPropietario 23,15

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

---	insertarMantenimiento(mantenimiento)