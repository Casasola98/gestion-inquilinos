import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function VisualizarAme(props) {
  const { isLogin, setIsLogin } = props;
  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [amenidades, setAmenidades] = useState([]);

  useEffect(() => {
    if (isLogin) {
      axios.post('http://localhost:8080/visualizarAmenidad', {
        cedula: 'cedulaPropietario' 
      })
      .then(response => {
        setAmenidades(response.data);
      })
      .catch(error => {
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

  const handleSave = (index) => {
    const updatedAmenidad = amenidades[index];
    axios.post('http://localhost:8080/editarAmenidad', {
      idAmenidad: updatedAmenidad.id,
      tipoAmenidad: updatedAmenidad.tipo,
      costoUso: updatedAmenidad.costo,
      estado: updatedAmenidad.estado,
      descripcion: updatedAmenidad.descripción,
      estadoActual: updatedAmenidad.estadoActual,
      cedula: 'cedulaPropietario' // Reemplaza esto con la variable que contiene la cédula del propietario
    })
    .then(response => {
      if (response.data.editarAmenidad) {
        alert("Amenidad editada exitosamente");
        setEditedRow(null);
        toggleEditMode();
      } else {
        alert("Error al editar la amenidad");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    });
  };

  const handleDelete = (index) => {
    const idAmenidad = amenidades[index].id;
    axios.post('http://localhost:8080/eliminarAmenidad', { idAmenidad })
    .then(response => {
      if (response.data.eliminarAmenidad) {
        alert("Amenidad eliminada exitosamente");
        setAmenidades(amenidades.filter((_, i) => i !== index));
      } else {
        alert("Error al eliminar la amenidad");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    });
  };

  const handleChange = (e, index, field) => {
    const newAmenidades = [...amenidades];
    newAmenidades[index][field] = e.target.value;
    setAmenidades(newAmenidades);
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
          {amenidades && amenidades.map((amenidad, index) => (
            <tr key={index}>
              <td>{amenidad.id}</td>
              <td>{editMode && editedRow === index ? <input type="number" defaultValue={amenidad.costo} onChange={(e) => handleChange(e, index, 'costo')} /> : amenidad.costo}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={amenidad.tipo} onChange={(e) => handleChange(e, index, 'tipo')} /> : amenidad.tipo}</td>
              <td>{editMode && editedRow === index ? <input type="text" defaultValue={amenidad.descripción} onChange={(e) => handleChange(e, index, 'descripción')} /> : amenidad.descripción}</td>
              <td>{editMode && editedRow === index ? <input type="number" defaultValue={amenidad.estado} onChange={(e) => handleChange(e, index, 'estado')} /> : amenidad.estado}</td>
              <td>{editMode && editedRow === index ? <input type="number" defaultValue={amenidad.estadoActual} onChange={(e) => handleChange(e, index, 'estadoActual')} /> : amenidad.estadoActual}</td>
              <td>
                {editMode && editedRow === index ? (
                  <a href="#" onClick={() => handleSave(index)}>Guardar</a>
                ) : (
                  <span>
                    <a href="#" onClick={() => handleEdit(index)}>Editar</a>
                    {" | "}
                    <a href="#" onClick={() => handleDelete(index)}>Eliminar</a>
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
