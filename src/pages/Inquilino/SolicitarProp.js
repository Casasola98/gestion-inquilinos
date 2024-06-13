import React, { useState } from "react";
import axios from "axios";
import '../../css/Amenidades.css';

function VisualizarAme(props) {
  const { isLogin, setIsLogin } = props;
  const [properties, setProperties] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("none");
  const [fechaFinal, setFechaFinal] = useState("none");
  const cedula = localStorage.getItem('user');

  if (!isLogin) {
    window.location.href = '/login';
  }

  const handleConsultar = () => {
    if (isLogin) {  // Realizar la consulta al backend para obtener las propiedades del propietario
      axios.post('http://localhost:8080/obtenerPropiedadesDisponibles', {
        fechaInicio: fechaInicio,
        fechaFin: fechaFinal
      })
        .then((response) => {
          setProperties(response.data.recordset);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleSolicitar = (idPropiedad) => {
    axios.post('http://localhost:8080/solicitarAlquilerP', {
      cedula: cedula,
      idPropiedad: idPropiedad,
      fechaInicio : fechaInicio,
      fechaFin : fechaFinal
    })
      .then((response) => {
        if (response.data.registrarPropiedad) {
          alert("Solicitud enviada exitosamente");

        } else {
          alert("Error al enviar solicitud");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
  
      });
  };

  if (isLogin) {
  return (
    <div className="propiedades">
      <h1 className="title">Solicitar propiedades</h1>
      <div className="consulta-fechas">
        <label className="label">
          Fecha de inicio:
          <input 
            type="date" 
            value={fechaInicio} 
            onChange={(e) => setFechaInicio(e.target.value)}
            className="inputBox" 
          />
        </label>
        <label className="label">
          Fecha final:
          <input 
            type="date" 
            value={fechaFinal} 
            onChange={(e) => setFechaFinal(e.target.value)}
            className="inputBox" 
          />
        </label>
        <button onClick={handleConsultar} className="option-link">Consultar</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID propiedad</th>
            <th>Dirección</th>
            <th>Tipo</th>
            <th>Número de habitaciones</th>
            <th>Tamaño</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Nombre propietario</th>
            <th>Apellido propietario</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {properties?.map((propiedad, index) => (
            <tr key={index}>
              <td>{propiedad.idPropiedad}</td>
              <td>{propiedad.direccion}</td>
              <td>{propiedad.tipoPropiedad}</td>
              <td>{propiedad.numeroHabitaciones}</td>
              <td>{propiedad.tamanoMetros}</td>
              <td>{propiedad.descripcion}</td>
              <td>{propiedad.precioAlquiler}</td>
              <td>{propiedad.nombre}</td>
              <td>{propiedad.apellido1}</td>
              <td>{propiedad.correo}</td>
              <td>{propiedad.telefono}</td>
              <td>
                <a href="#" onClick={() => handleSolicitar(propiedad.idPropiedad)}>Solicitar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}}

export default VisualizarAme;
