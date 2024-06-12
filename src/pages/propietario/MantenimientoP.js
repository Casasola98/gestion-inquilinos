import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

const getFecha = (fecha) => {
	return `${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate()}`;
}

function MantenimientoP(props) {
  const { isLogin, setIsLogin } = props;
  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [properties, setProperties] = useState([]);

  const [editProperty, setEditProperties] = useState({
    cedula: (localStorage.getItem('user')),
    idSolicitud: "",
    idPropiedad: "",
    descripcionProblema: "",
    fechaSolicitud: "",
    estadoMantenimiento: "",
    prioridad: "",
    idProveedor: "",
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    telefono: ""
  });

  //idSolicitud, Propiedad.idPropiedad, descripcionProblemaProblema, fechaSolicitud, estadoMantenimientoMantenimiento, prioridad, Proveedores.idProveedor, nombre, primerApellido, segundoApellido, especialidad, telefono FROM SolicitudMantenimiento JOIN Propiedad ON SolicitudMantenimiento.idPropiedad = Propiedad.idPropiedad JOIN PrioridadesPermitidas ON SolicitudMantenimiento.idPrioridad = PrioridadesPermitidas.idPrioridad JOIN Proveedores ON SolicitudMantenimiento.idProveedor = Proveedores.idProveedor JOIN estadoMantenimientosMantenimientoPermitidos ON idestadoMantenimientoMantenimiento = SolicitudMantenimiento.estadoMantenimiento WHERE Propiedad.cedulaPropietario = @cedulaUsuario
  if (!isLogin) {
    window.location.href = '/login';
  }

  useEffect(() => {
    if (isLogin) {
      axios.post('http://localhost:8080/visualizarMantenimientos', { cedula: localStorage.getItem('user') })
      .then((response) => {
        setProperties(response.data.recordset);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    }
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProperties((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEdit = (rowIndex, property) => {
    setEditProperties({
      cedula: localStorage.getItem('user'),
      idSolicitud: property.idSolicitud,
      idPropiedad: property.idPropiedad,
      descripcionProblema: property.descripcionProblema,
      fechaSolicitud: property.fechaSolicitud,
      estadoMantenimiento: property.estadoMantenimiento == "pendiente" ? 1 : property.estadoMantenimiento == "en proceso" ? 2 : 3 ,
      prioridad: property.prioridad,
      idProveedor: property.idProveedor,
      nombre: property.nombre,
      primerApellido: property.primerApellido,
      segundoApellido: property.segundoApellido,
      especialidad: property.especialidad,
      telefono: property.telefono
    });
    setEditedRow(rowIndex);
    toggleEditMode();
  };


//   //INSERT INTO PrioridadesPermitidas (idPrioridad, prioridad) VALUES
// (1, 'baja'),
// (2, 'media'),
// (3, 'alta');

// INSERT INTO EstadosMantenimientoPermitidos (idEstadoMantenimiento, estadoMantenimiento) VALUES
// (1, 'pendiente'),
// (2, 'en proceso'),
// (3, 'resuelto');

  const handleSave = () => {
    axios.post('http://localhost:8080/actualizarMantenimientos', {
      idSolicitud: editProperty.idSolicitud,
      estado: editProperty.estadoMantenimiento
    })
      .then((response) => {
        if (response.data.actualizarMantenimiento) {
          setEditedRow(null);
          toggleEditMode();
          axios.post('http://localhost:8080/visualizarMantenimientos', {
            cedula: localStorage.getItem('user')
          })
          .then((response) => {
            setProperties(response.data.recordset);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        } else {
          alert("Error al actualizar la solicitud de mantenimiento");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al conectar con el servidor");
      });
  };

  if (isLogin) {
    return (
      <div className="propiedades">
        <h1 className="title">Solicitudes de mantenimiento</h1>
        <div className="table-contenedor">
          <table className="table">
            <thead>
              <tr>
                <th>ID Solicitud</th>
                <th>ID Propiedad</th>
                <th>Descripción</th>
                <th>Fecha de solicitud</th>
                <th>estadoMantenimiento</th>
                <th>Prioridad</th>
                <th>ID Proveedor</th>
                <th>Nombre Proveedor</th>
                <th>Apellido 1 Proveedor</th>
                <th>Apellido 2 Proveedor</th>
                <th>Especialidad</th>
                <th>Teléfono Proveedor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property, index) => (
                <tr key={index}>
                  <td>{property.idSolicitud}</td>
                  <td>{property.idPropiedad}</td>
                  <td>{property.descripcionProblema}</td>
                  <td>{getFecha(new Date(property.fechaSolicitud))}</td>
                  <td>{editMode && editedRow === index ? 
                    <select
                      defaultValue={editProperty.estadoMantenimiento}
                      onChange={handleChange}
                      name="estadoMantenimiento"
                    >
                      <option value="1">pendiente</option>
                      <option value="2">en proceso</option>
                      <option value="3">resuelto</option>
                    </select>
                    : property.estadoMantenimiento}</td>
                  <td>{property.prioridad}</td>
                  <td>{property.idProveedor}</td>
                  <td>{property.nombre}</td>
                  <td>{property.primerApellido}</td>
                  <td>{property.segundoApellido}</td>
                  <td>{property.especialidad}</td>
                  <td>{property.telefono}</td>
                  <td>
                    {editMode && editedRow === index ? (
                      <a href="#" onClick={() => handleSave()}>Guardar</a>
                    ) : (
                      <span>
                        <a href="#" onClick={() => handleEdit(index, property)}>Editar</a>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return (
    <div className="home"></div>
  );
}

export default MantenimientoP;
