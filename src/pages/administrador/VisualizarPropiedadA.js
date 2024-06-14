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
      axios.post('http://localhost:8080/visualizarPropiedadesAdmin')
        .then((response) => {
          setProperties(response.data.recordset);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);
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
            </tr>
          </thead>
          <tbody>
            {properties?.map(function (property, index) {
              return (
                <tr key={index}>
                  <td>{property.idPropiedad}</td>
                  <td>{property.idTipoPropiedad}</td>
                  <td>{property.tamanoMetros}</td>
                  <td>{property.descripcion}</td>
                  <td>{property.precioAlquiler}</td>
                  <td>{property.direccion}</td>
                  <td>{property.numeroHabitaciones}</td>
                  <td>{property.estado}</td>
                  <td>
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
