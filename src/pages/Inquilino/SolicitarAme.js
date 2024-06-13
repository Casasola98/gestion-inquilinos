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
      axios.post('http://localhost:8080/obtenerAmenidadesDisponibles', {
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

  const handleSolicitar = (idAmenidad) => {
    axios.post('http://localhost:8080/solicitarAlquilerA', {
      cedula: cedula,
      idAmenidad: idAmenidad,
      fechaInicio : fechaInicio,
      fechaFin : fechaFinal
    })
      .then((response) => {
        if (response.data.enviarSolicitud) {
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
        <h1 className="title">Solicitar amenidades</h1>
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
              <th>ID amenidad</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Costo</th>
              <th>Estado</th>
              <th>Cédula propietario</th>
              <th>Nombre propietario</th>
              <th>Apellido propietario</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((amenidad, index) => (
              <tr key={index}>
                <td>{amenidad.idAmenidad}</td>
                <td>{amenidad.tipoAmenidad}</td>
                <td>{amenidad.descripcion}</td>
                <td>{amenidad.costoUso}</td>
                <td>{amenidad.estado}</td>
                <td>{amenidad.cedulaPropietario}</td>
                <td>{amenidad.nombre}</td>
                <td>{amenidad.apellido1}</td>
                <td>{amenidad.correo}</td>
                <td>{amenidad.telefono}</td>
                <td>
                  <a  href="#" onClick={() => handleSolicitar(amenidad.idAmenidad)}>Solicitar</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}}
    export default VisualizarAme;
