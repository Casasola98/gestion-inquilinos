import React, { useState } from "react";
import '../../css/Admin.css';

function VisualizarP(props) {
  const { isLogin, setIsLogin } = props;
  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [properties, setProperties] = useState([
    { id: 1, tipo: "Casa", tamaño: "Grande", descripción: "Descripción de la casa", precio: 1000, dirección: "Calle 123", habitaciones: 3, estado: 1 },
    { id: 2, tipo: "Apartamento", tamaño: "Pequeño", descripción: "Descripción del apartamento", precio: 2000, dirección: "Avenida 456", habitaciones: 2, estado: 2 }
  ]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEdit = (rowIndex) => {
    setEditedRow(rowIndex);
    toggleEditMode();
  };

  const handleSave = () => {
    // Guardar los cambios
    setEditedRow(null);
    toggleEditMode();
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
                  <a href="#" onClick={handleSave}>Guardar</a>
                ) : (
                  <span>
                    <a href="#" onClick={() => handleEdit(index)}>Editar</a>
                    {" | "}
                    <a href="#">Eliminar</a>
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

export default VisualizarP;
