import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function RegistrarP(props) {
  const { isLogin, setIsLogin } = props;
  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [properties, setProperties] = useState([]);

  const [editProperty, setEditProperties] = useState({
    cedula: (localStorage.getItem('user')),
    idPropiedad: "",
    idTipoPropiedad: "",
    numeroHabitaciones: "",
    tamanoMetros: "",
    descripcion: "",
    estado: 1,
    precioAlquiler: "",
    direccion: ""
  });

  if (!isLogin) {
    window.location.href = '/login';
  }

  useEffect(() => {
    if (isLogin) {  // Realizar la consulta al backend para obtener las propiedades del propietario
      axios.post('http://localhost:8080/visualizarPropiedades', { cedula: localStorage.getItem('user') })
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
      idPropiedad: property.idPropiedad,
      idTipoPropiedad: property.idTipoPropiedad,
      numeroHabitaciones: property.numeroHabitaciones,
      tamanoMetros: property.tamanoMetros,
      descripcion: property.descripcion,
      estado: 1,
      precioAlquiler: property.precioAlquiler,
      direccion: property.direccion
    });
    setEditedRow(rowIndex);
    toggleEditMode();
  };

  const handleSave = () => {
    console.log(editProperty)
    axios.post('http://localhost:8080/editarPropiedad', editProperty)
      .then((response) => {
        if (response.data.editarPropiedad) {
          // Actualizar la propiedad en el estado local
          setEditedRow(null);
          toggleEditMode();
          axios.post('http://localhost:8080/visualizarPropiedades', { cedula: localStorage.getItem('user') })
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
    axios.post('http://localhost:8080/eliminarPropiedad', { idPropiedad: idPropiedad })
      .then((response) => {
        if (response.data.eliminarPropiedad) {
          // Eliminar la propiedad del estado local
          axios.post('http://localhost:8080/visualizarPropiedades', { cedula: localStorage.getItem('user') })
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
        <h1 className="title">Visualizar propiedades</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID Propiedad</th>
              <th>Tipo</th>
              <th>Tamaño</th>
              <th>descripcion</th>
              <th>Precio</th>
              <th>Dirección</th>
              <th>Num Habitaciones</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties?.map(function (property, index) {
              return (
                <tr key={index}>
                  <td>{property.idPropiedad}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.idTipoPropiedad} name="idTipoPropiedad" onChange={handleChange} /> : property.idTipoPropiedad}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.tamanoMetros} name="tamanoMetros" onChange={handleChange} /> : property.tamanoMetros}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.descripcion} name="descripcion" onChange={handleChange} /> : property.descripcion}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.precioAlquiler} name="precioAlquiler" onChange={handleChange} /> : property.precioAlquiler}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.direccion} name="direccion" onChange={handleChange} /> : property.direccion}</td>
                  <td>{editMode && editedRow === index ? <input type="text" defaultValue={editProperty.numeroHabitaciones} name="numeroHabitaciones" onChange={handleChange} /> : property.numeroHabitaciones}</td>
                  <td>{property.estado}</td>
                  <td>
                    {editMode && editedRow === index ? (
                      <a href="#" onClick={() => handleSave()}>Guardar</a>
                    ) : (
                      <span>
                        <a href="#" onClick={() => handleEdit(index, property)}>Editar</a>
                        {" | "}
                        <a href="#" onClick={() => handleDelete(property.idPropiedad)}>Eliminar</a>
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
export default RegistrarP;
