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
    cedulaUsuario INT,
    idRecurso INT PRIMARY KEY,
    fechaInicio DATE NOT NULL,
    fechaFin DATE,
    FOREIGN KEY (cedulaUsuario) REFERENCES Usuario(cedula) ON DELETE CASCADE,
);

CREATE TABLE alquilerPropiedad (
    idPropiedad INT PRIMARY KEY,
    FOREIGN KEY (idPropiedad) REFERENCES Alquiler(idRecurso) ON DELETE CASCADE,
);

CREATE TABLE alquilerAmenidades (
    idAmenidad INT PRIMARY KEY,
    FOREIGN KEY (idAmenidad) REFERENCES Alquiler(idRecurso) ON DELETE CASCADE,
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









--Ejmeplos *** hay que actualizarlo según los cambios
-- Insertar datos de ejemplo en la base de datos Proyecto1

-- -- Insertar usuarios
-- INSERT INTO Usuario (cedula, nombre, apellido1, apellido2, telefono, correo) 
-- VALUES 
--     (123456789, 'Juan', 'Perez', 'Garcia', '5551234567', 'juan@example.com'),
--     (987654321, 'Maria', 'Gomez', 'Lopez', '5559876543', 'maria@example.com');

-- -- Insertar propietarios e inquilinos
-- INSERT INTO Propietario (cedula) VALUES (123456789);
-- INSERT INTO Inquilino (cedula) VALUES (987654321);

-- -- Insertar tipos de propiedad
-- INSERT INTO TiposPropiedad (idTipoPropiedad, tipoPropiedad) 
-- VALUES 
--     (1, 'Apartamento'),
--     (2, 'Casa'),
--     (3, 'Oficina');

-- -- Insertar propiedades
-- INSERT INTO Propiedad (idPropiedad, direccion, idTipoPropiedad, numeroHabitaciones, tamanoMetros, descripcion, estadoActual, precioAlquiler, cedulaPropietario) 
-- VALUES (1, 'Calle Principal 123', 1, 2, 100, 'Apartamento acogedor', 1, 1000, 123456789);

-- -- Insertar tipos de gastos adicionales
-- INSERT INTO TiposGastosAdicionales (idTipoGasto, tipoGasto) 
-- VALUES 
--     (1, 'Servicios'),
--     (2, 'Comunidad'),
--     (3, 'Mantenimiento');

-- -- Insertar gastos adicionales de propiedad
-- INSERT INTO GastosAdicionalesPropiedad (idPropiedad, idTipoGasto, monto) 
-- VALUES (1, 1, 50), (1, 3, 80);


-- -- Insertar tipos de pago permitidos
-- INSERT INTO TiposPagoPermitidos (idTipoPago, tipoPago) 
-- VALUES 
--     (1, 'Alquiler'),
--     (2, 'Servicios'),
--     (3, 'Mantenimiento');

-- -- Insertar estados de pago permitidos
-- INSERT INTO EstadosPagoPermitidos (idEstadoPago, estadoPago) 
-- VALUES 
--     (1, 'Pendiente'),
--     (2, 'Realizado'),
--     (3, 'Atrasado');

-- -- Insertar estados de mantenimiento permitidos
-- INSERT INTO EstadosMantenimientoPermitidos (idEstadoMantenimiento, estadoMantenimiento) 
-- VALUES 
--     (1, 'Pendiente'),
--     (2, 'En proceso'),
--     (3, 'Resuelto');

-- -- Insertar prioridades permitidas
-- INSERT INTO PrioridadesPermitidas (idPrioridad, prioridad) 
-- VALUES 
--     (1, 'Baja'),
--     (2, 'Media'),
--     (3, 'Alta');

-- -- Insertar proveedores
-- INSERT INTO Proveedores (idProveedor, nombre, primerApellido, segundoApellido, especialidad, correo, telefono) 
-- VALUES
--     (1, 'Juan', 'Perez', 'Garcia', 'Electricista', 'juanperez@example.com', '123456789'),
--     (2, 'Maria', 'Gomez', 'Lopez', 'Jardinero', 'mariagomez@example.com', '987654321'),
--     (3, 'Carlos', 'Martinez', 'Fernandez', 'Carpintero', 'carlosmartinez@example.com', '555666777');

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
