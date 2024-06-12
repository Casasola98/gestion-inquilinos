import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function RegistrarP(props) {
  const { isLogin } = props;
  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (!isLogin) {
      window.location.href = '/login';
    } else {
      // Realizar la consulta al backend para obtener las propiedades del propietario
      axios.post('http://localhost:8080/visualizarPropiedades', { cedula: 'cedulaPropietario' }) 
        .then((response) => {
          setProperties(response.data.recordset);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [isLogin]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEdit = (rowIndex) => {
    setEditedRow(rowIndex);
    toggleEditMode();
  };

  const handleSave = (property) => {
    axios.post('http://localhost:8080/editarPropiedad', property)
      .then((response) => {
        if (response.data.editarPropiedad) {
          // Actualizar la propiedad en el estado local
          let updatedProperties = [...properties];
          updatedProperties[editedRow] = property;
          setProperties(updatedProperties);

          setEditedRow(null);
          toggleEditMode();
        } else {
          console.error("Error al editar la propiedad");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (idPropiedad) => {
    axios.post('http://localhost:8080/eliminarPropiedad', { idPropiedad })
      .then((response) => {
        if (response.data.eliminarPropiedad) {
          // Eliminar la propiedad del estado local
          let updatedProperties = properties.filter(property => property.id !== idPropiedad);
          setProperties(updatedProperties);
        } else {
          console.error("Error al eliminar la propiedad");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="propiedades">
      <h1 className="title">Visualizar propiedades</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID Propiedad</th>
            <th>Tipo</th>
            <th>Tamaño</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Dirección</th>
            <th>Num Habitaciones</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr key={index}>
              <td>{property.id}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={property.tipo} /> : property.tipo}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={property.tamaño} /> : property.tamaño}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={property.descripción} /> : property.descripción}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={property.precio} /> : property.precio}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={property.dirección} /> : property.dirección}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={property.habitaciones} /> : property.habitaciones}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={property.estado} /> : property.estado}</td>
              <td>
                {editMode && editedRow === index ? (
                  <a href="#" onClick={() => handleSave(property)}>Guardar</a>
                ) : (
                  <span>
                    <a href="#" onClick={() => handleEdit(index)}>Editar</a>
                    {" | "}
                    <a href="#" onClick={() => handleDelete(property.id)}>Eliminar</a>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegistrarP;
