import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function MantenimientoP(props) {
  const { isLogin, setIsLogin } = props;

  // Si nadie ha iniciado sesion lo envia a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  const [properties, setProperties] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [updatedProperties, setUpdatedProperties] = useState([]);

  useEffect(() => {
    if (isLogin) {
      axios.post('http://localhost:8080/visualizarMantenimientos', {
        cedula: 'cedulaPropietario' // Reemplaza esto con la variable que contiene la cédula del propietario
      })
      .then(response => {
        setProperties(response.data);
        setUpdatedProperties(response.data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    }
  }, [isLogin]);

  const handleEditClick = (index) => {
    setEditMode(index);
  };

  const handleSaveClick = (index) => {
    const updated = [...properties];
    updated[index] = updatedProperties[index];
    setProperties(updated);
    setEditMode(null);

    const updatedProperty = updatedProperties[index];
    axios.post('http://localhost:8080/actualizarMantenimientos', {
      idSolicitud: updatedProperty.idSolicitud,
      estado: updatedProperty.estado
    })
    .then(response => {
      if (response.data.eliminarAmenidad) {
        alert("Solicitud de mantenimiento actualizada exitosamente");
      } else {
        alert("Error al actualizar la solicitud de mantenimiento");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    });
  };

  const handleChange = (index, field, value) => {
    const updated = [...updatedProperties];
    updated[index][field] = value;
    setUpdatedProperties(updated);
  };

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
              <th>Télefono Proveedor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr key={index}>
                {editMode === index ? (
                  <>
                    <td><input type="number" value={updatedProperties[index].idSolicitud} onChange={(e) => handleChange(index, 'idSolicitud', e.target.value)} /></td>
                    <td><input type="number" value={updatedProperties[index].idPropiedad} onChange={(e) => handleChange(index, 'idPropiedad', e.target.value)} /></td>
                    <td><input type="text" value={updatedProperties[index].descripcion} onChange={(e) => handleChange(index, 'descripcion', e.target.value)} /></td>
                    <td><input type="text" value={updatedProperties[index].fechaSolicitud} onChange={(e) => handleChange(index, 'fechaSolicitud', e.target.value)} /></td>
                    <td><input type="number" value={updatedProperties[index].estado} onChange={(e) => handleChange(index, 'estado', e.target.value)} /></td>
                    <td><input type="text" value={updatedProperties[index].prioridad} onChange={(e) => handleChange(index, 'prioridad', e.target.value)} /></td>
                    <td><input type="number" value={updatedProperties[index].idProveedor} onChange={(e) => handleChange(index, 'idProveedor', e.target.value)} /></td>
                    <td><input type="text" value={updatedProperties[index].nombreProveedor} onChange={(e) => handleChange(index, 'nombreProveedor', e.target.value)} /></td>
                    <td><input type="text" value={updatedProperties[index].apellido1Proveedor} onChange={(e) => handleChange(index, 'apellido1Proveedor', e.target.value)} /></td>
                    <td><input type="text" value={updatedProperties[index].apellido2Proveedor} onChange={(e) => handleChange(index, 'apellido2Proveedor', e.target.value)} /></td>
                    <td><input type="text" value={updatedProperties[index].especialidad} onChange={(e) => handleChange(index, 'especialidad', e.target.value)} /></td>
                    <td><input type="text" value={updatedProperties[index].telefonoProveedor} onChange={(e) => handleChange(index, 'telefonoProveedor', e.target.value)} /></td>
                  </>
                ) : (
                  <>
                    <td>{property.idSolicitud}</td>
                    <td>{property.idPropiedad}</td>
                    <td>{property.descripcion}</td>
                    <td>{property.fechaSolicitud}</td>
                    <td>{property.estado}</td>
                    <td>{property.prioridad}</td>
                    <td>{property.idProveedor}</td>
                    <td>{property.nombreProveedor}</td>
                    <td>{property.apellido1Proveedor}</td>
                    <td>{property.apellido2Proveedor}</td>
                    <td>{property.especialidad}</td>
                    <td>{property.telefonoProveedor}</td>
                  </>
                )}
                <td>
                  {editMode === index ? (
                    <a href="#" onClick={() => handleSaveClick(index)}>Guardar</a>
                  ) : (
                    <a href="#" onClick={() => handleEditClick(index)}>Actualizar</a>
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

export default MantenimientoP;
