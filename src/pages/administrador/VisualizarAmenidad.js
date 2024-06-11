import React, { useState } from "react";
import '../../css/Propiedades.css';

function VisualizarAme(props) {
  const { isLogin, setIsLogin } = props;
  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [amenidades, setAmenidades] = useState([
    { id: 1, costo: 100, tipo: "Gimnasio", descripción: "Gimnasio completamente equipado", estado: 1 },
    { id: 2, costo: 50, tipo: "Piscina", descripción: "Piscina climatizada", estado: 2 }
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
      <h1 className="title">Visualizar amenidades</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID amenidad</th>
            <th>Costo</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Estado Actual</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {amenidades.map((amenidad, index) => (
            <tr key={index}>
              <td>{amenidad.id}</td>
              <td>{editMode && editedRow === index ? <input type="number" defaultValue={amenidad.costo} /> : amenidad.costo}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={amenidad.tipo} /> : amenidad.tipo}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={amenidad.descripción} /> : amenidad.descripción}</td>
              <td>{editMode && editedRow === index ? <input type="number" defaultValue={amenidad.estado} /> : amenidad.estado}</td>
              <td>{editMode && editedRow === index ? <input type="number" defaultValue={amenidad.estadoActual} /> : amenidad.estadoActual}</td>

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

export default VisualizarAme;
