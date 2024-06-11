import React, { useState, useEffect } from "react";
import '../../css/Propiedades.css';

function MantenimientoP(props) {
  const { isLogin, setIsLogin } = props;

  // Si nadie ha iniciado sesion lo envia a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  const [properties, setProperties] = useState([
    { idSolicitud: 1, idPropiedad: 101, descripcion: "Reparar tubería", idProveedor: 201, fechaSolicitud: "2023-01-01", estado: 1, prioridad: "Alta", costo: 100, nombreProveedor: "Juan", apellido1Proveedor: "Pérez", apellido2Proveedor: "Gómez", especialidad: "Plomería", telefonoProveedor: "123456789", comentarios: "" },
    { idSolicitud: 2, idPropiedad: 102, descripcion: "Pintar paredes", idProveedor: 202, fechaSolicitud: "2023-02-15", estado: 2, prioridad: "Media", costo: 200, nombreProveedor: "Luis", apellido1Proveedor: "Martínez", apellido2Proveedor: "Rodríguez", especialidad: "Pintura", telefonoProveedor: "987654321", comentarios: "" }
  ]);

  const [editMode, setEditMode] = useState(null);
  const [updatedProperties, setUpdatedProperties] = useState(properties);

  const handleEditClick = (index) => {
    setEditMode(index);
  };

  const handleSaveClick = (index) => {
    const updated = [...properties];
    updated[index] = updatedProperties[index];
    setProperties(updated);
    setEditMode(null);
  };

  const handleChange = (index, field, value) => {
    const updated = [...updatedProperties];
    updated[index][field] = value;
    setUpdatedProperties(updated);
  };

  return (
    <div className="propiedades">
      <h1 className="title">Solicitudes de mantenimiento</h1>
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

                  //<td><input type="number" value={updatedProperties[index].costo} onChange={(e) => handleChange(index, 'costo', e.target.value)} /></td>
                  //<td><input type="text" value={updatedProperties[index].comentarios} onChange={(e) => handleChange(index, 'comentarios', e.target.value)} /></td>
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
  );
}

export default MantenimientoP;
