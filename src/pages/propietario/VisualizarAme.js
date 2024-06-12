import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function VisualizarAme(props) {
  const { isLogin, setIsLogin } = props;
  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [amenidades, setProperties] = useState([]);

  const [editProperty, setEditProperties] = useState({
    cedula: (localStorage.getItem('user')),
    idAmenidad: "",
    tipoAmenidad: "",
    costoUso: "",
    estado: "",
    descripcion: "",
    estadoActual: "",
  });

  if (!isLogin) {
    window.location.href = '/login';
  }

  useEffect(() => {
    if (isLogin) {  // Realizar la consulta al backend para obtener las propiedades del propietario
      axios.post('http://localhost:8080/visualizarAmenidad', { cedula: localStorage.getItem('user') })
        .then((response) => {
          setProperties(response.data.recordset);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

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
    console.log(property)
    setEditProperties({
      cedula: localStorage.getItem('user'),
      idAmenidad: property.idAmenidad,
      tipoAmenidad: property.tipoAmenidad,
      costoUso: property.costoUso,
      estado: property.estado,
      descripcion: property.descripcion,
      estadoActual: property.estadoActual
    });
    setEditedRow(rowIndex);
    toggleEditMode();
  };

  const handleSave = () => {
    console.log(editProperty)
    axios.post('http://localhost:8080/editarAmenidad', editProperty)
      .then((response) => {
        if (response.data.editarPropiedad) {
          // Actualizar la propiedad en el estado local
          setEditedRow(null);
          toggleEditMode();
          axios.post('http://localhost:8080/visualizarAmenidad', { cedula: localStorage.getItem('user') })
            .then((response) => {
              setProperties(response.data.recordset);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else {
          alert("Error al editar la propiedad");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (idPropiedad) => {
    axios.post('http://localhost:8080/eliminarAmenidad', { idPropiedad: idPropiedad })
      .then((response) => {
        if (response.data.eliminarPropiedad) {
          // Eliminar la propiedad del estado local
          axios.post('http://localhost:8080/visualizarAmenidad', { cedula: localStorage.getItem('user') })
            .then((response) => {
              setProperties(response.data.recordset);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else {
          alert("Error al eliminar la propiedad");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


if (isLogin) {
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
          {amenidades && amenidades.map((amenidad, index) => {  
            return (
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
            </tr>)
          })}
        </tbody>
      </table>
    </div>
   );
  }
  return (
   <div className="home"></div>
  );
}

export default VisualizarAme;
