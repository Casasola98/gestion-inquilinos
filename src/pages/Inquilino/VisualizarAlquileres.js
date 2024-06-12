import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

const getFecha = (fecha) => {
	return `${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate()}`;
}


function VisualizarAlq(props) {
  const { isLogin } = props;
  const cedula = localStorage.getItem('user');
  const [alquileresP, setAlquileresP] = useState([]);
  const [alquileresA, setAlquileresA] = useState([]);
  if (!isLogin) {
    window.location.href = '/login';
  }
  useEffect(() => {
    if (isLogin) {
      // Reemplaza "cedulaDelUsuario" con la cédula del usuario logueado
      axios.post('http://localhost:8080/visualizarAlquilerIP', { cedula })
        .then(response => {
          setAlquileresP(response.data.recordset);
        })
        .catch(error => {
          console.error("Error fetching alquileresP:", error);
        });

        axios.post('http://localhost:8080/visualizarAlquilerIA', { cedula })
        .then(response => {
          setAlquileresA(response.data.recordset);
        })
        .catch(error => {
          console.error("Error fetching alquileresP:", error);
        });
    }
  }, [isLogin]);
  
  if(isLogin){ 
    return (
    <div className="propiedades">
      <h1 className="title">Visualizar alquileres activos </h1>
      <h2 className="subtitle">Alquileres de propiedades</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Id propiedad</th>
            <th>Direccion</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
          </tr>
        </thead>
        <tbody>
          {alquileresP?.map(function (alquiler, index) {
            return (
            <tr key={index}>
              <td>{alquiler.idPropiedad}</td>
              <td>{alquiler.direccion}</td>
              <td>{getFecha(new Date (alquiler.fechaInicio))}</td>
              <td>{getFecha(new Date (alquiler.fechaFin ))}</td>
            </tr>)
          })}
        </tbody>
      </table>
      <br/><br/> 
      <h2 className="subtitle">Alquileres de amenidad</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Id amenidad</th> 
            <th>Tipo</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
          </tr>
        </thead>
        <tbody>
          {alquileresA?.map(function (alquiler, index) {
            return (
            <tr key={index}>
              <td>{alquiler.idAmenidad}</td>
              <td>{alquiler.tipoAmenidad}</td>
              <td>{getFecha(new Date (alquiler.fechaInicio))}</td>
              <td>{getFecha(new Date (alquiler.fechaFin ))}</td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
}
}
export default VisualizarAlq;
