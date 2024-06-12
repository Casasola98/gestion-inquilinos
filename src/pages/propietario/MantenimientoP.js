import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function MantenimientoP(props) {
  const { isLogin, setIsLogin } = props;
  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [properties, setProperties] = useState([]);

  const [editProperty, setEditProperties] = useState({
    cedula: (localStorage.getItem('user')),
    idSolicitud: "",
    idPropiedad: "",
    descripcion: "",
    fechaSolicitud: "",
    estado: "",
    prioridad: "",
    idProveedor: "",
    nombreProveedor: "",
    apellido1Proveedor: "",
    apellido2Proveedor: "",
    especialidad: "",
    telefonoProveedor: ""
  });

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
      descripcion: property.descripcion,
      fechaSolicitud: property.fechaSolicitud,
      estado: property.estado,
      prioridad: property.prioridad,
      idProveedor: property.idProveedor,
      nombreProveedor: property.nombreProveedor,
      apellido1Proveedor: property.apellido1Proveedor,
      apellido2Proveedor: property.apellido2Proveedor,
      especialidad: property.especialidad,
      telefonoProveedor: property.telefonoProveedor
    });
    setEditedRow(rowIndex);
    toggleEditMode();
  };

  const handleSave = () => {
    axios.post('http://localhost:8080/actualizarMantenimientos', editProperty)
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
                <th>Estado</th>
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
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.idSolicitud} name="idSolicitud" onChange={handleChange} /> : property.idSolicitud}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.idPropiedad} name="idPropiedad" onChange={handleChange} /> : property.idPropiedad}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.descripcion} name="descripcion" onChange={handleChange} /> : property.descripcion}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.fechaSolicitud} name="fechaSolicitud" onChange={handleChange} /> : property.fechaSolicitud}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.estado} name="estado" onChange={handleChange} /> : property.estado}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.prioridad} name="prioridad" onChange={handleChange} /> : property.prioridad}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.idProveedor} name="idProveedor" onChange={handleChange} /> : property.idProveedor}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.nombreProveedor} name="nombreProveedor" onChange={handleChange} /> : property.nombreProveedor}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.apellido1Proveedor} name="apellido1Proveedor" onChange={handleChange} /> : property.apellido1Proveedor}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.apellido2Proveedor} name="apellido2Proveedor" onChange={handleChange} /> : property.apellido2Proveedor}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.especialidad} name="especialidad" onChange={handleChange} /> : property.especialidad}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.telefonoProveedor} name="telefonoProveedor" onChange={handleChange} /> : property.telefonoProveedor}</td>
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
