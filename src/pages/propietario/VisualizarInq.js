import React, { useState } from "react";
import '../../css/Propiedades.css';

function VisualizarInquilinos(props) {
  const { isLogin, setIsLogin } = props;
  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [interruptRow, setInterruptRow] = useState(null);
  const [evictionTime, setEvictionTime] = useState("");
  const [evictionReason, setEvictionReason] = useState("");
  const [properties, setProperties] = useState([
    { id: 1, tipo: "Casa", tamaño: "Grande", descripción: "Descripción de la casa", precio: 1000, dirección: "Calle 123", habitaciones: 3, estado: 1, gastosAdicionales: 200 },
    { id: 2, tipo: "Apartamento", tamaño: "Pequeño", descripción: "Descripción del apartamento", precio: 2000, dirección: "Avenida 456", habitaciones: 2, estado: 2, gastosAdicionales: 300 }
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

  const handleInterrupt = (rowIndex) => {
    setInterruptRow(rowIndex);
  };

  const handleEvictionSubmit = () => {
    if (evictionTime && evictionReason) {
      // Guardar la información de desalojo aquí
      console.log(`Tiempo de desalojo: ${evictionTime}, Razón de desalojo: ${evictionReason}`);
      setInterruptRow(null);
      setEvictionTime("");
      setEvictionReason("");
    } else {
      alert("Por favor ingrese tanto el tiempo como la razón de desalojo.");
    }
  };

  return (
    <div className="propiedades">
      <h1 className="title">Visualizar inquilinos</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID Propiedad</th>
            <th>Dirección</th>
            <th>Tipo</th>
            <th>Num Habitaciones</th>
            <th>Tamaño</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr key={index}>
              <td>{property.id}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={property.tipo} className="inputBox" /> : property.tipo}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={property.tamaño} className="inputBox" /> : property.tamaño}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={property.descripción} className="inputBox" /> : property.descripción}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={property.precio} className="inputBox" /> : property.precio}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={property.dirección} className="inputBox" /> : property.dirección}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={property.habitaciones} className="inputBox" /> : property.habitaciones}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={property.estado} className="inputBox" /> : property.estado}</td>
              <td>
                {editMode && editedRow === index ? (
                  <a href="#" onClick={handleSave}>Guardar</a>
                ) : (
                  <span>
                    <a href="#" onClick={() => handleInterrupt(index)}>Interrumpir</a>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {interruptRow !== null && (
        <div className="eviction-form">
          <h3>Interrumpir Inquilino</h3>
          <label>
            Tiempo de desalojo (días):
            <input
              type="number"
              value={evictionTime}
              onChange={(e) => setEvictionTime(e.target.value)}
              className="inputBox"
            />
          </label>
          <label>
            Razón de desalojo:
            <textarea
              value={evictionReason}
              onChange={(e) => setEvictionReason(e.target.value)}
              className="inputBox"
            />
          </label>
          <button onClick={handleEvictionSubmit}>Enviar</button>
        </div>
      )}
    </div>
  );
}

export default VisualizarInquilinos;
