import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function VisualizarInquilinos(props) {
  const { isLogin, cedula } = props;
  const [properties, setProperties] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [interruptRow, setInterruptRow] = useState(null);
  const [evictionTime, setEvictionTime] = useState("");
  const [evictionReason, setEvictionReason] = useState("");

  useEffect(() => {
    if (isLogin) {
      axios.post('http://localhost:8080/visualizarInquilinosP', { cedula })
        .then(response => {
          setProperties(response.data.recordset);
        })
        .catch(error => {
          console.error("Error al obtener propiedades:", error);
        });
    } else {
      window.location.href = '/login';
    }
  }, [isLogin, cedula]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInterrupt = (index) => {
    setInterruptRow(index);
  };

  const handleEvictionSubmit = () => {
    if (evictionTime && evictionReason) {
      const property = properties[interruptRow];
      axios.post('http://localhost:8080/editarInquilinoP', {
        cedulaPropietario: property.cedulaP,
        cedulaInquilino: property.cedulaInq,
        newMonth: evictionTime,
        contenido: evictionReason,
        idPropiedad: property.id
      })
        .then(response => {
          if (response.data.interrumpirAlquiler) {
            console.log("Alquiler interrumpido exitosamente");
          } else {
            console.error("Error al interrumpir el alquiler");
          }
        })
        .catch(error => {
          console.error("Error al interrumpir el alquiler:", error);
        });
    } else {
      alert("Por favor ingrese tanto el tiempo como la razón de desalojo.");
    }
  };

  const handleSave = () => {
    setEditedRow(null);
    setEditMode(false);
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
          { properties?.map((property, index) => (
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
            Tiempo de desalojo (meses):
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
