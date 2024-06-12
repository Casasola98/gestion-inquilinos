import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function VisualizarSolicitudA(props) {
  const { isLogin, cedula } = props;
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (isLogin) {
      axios.post('http://localhost:8080/visualizarSolicitudesA', { cedula })
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

  const handleAccept = (index) => {
    const property = properties[index];
    axios.post('http://localhost:8080/crearInquilinoAmenidad', {
      cedula: property.cedulaInq,
      fechaInicio: property.fechaInicio,
      fechaFin: property.fechaFin,
      idAmenidad: property.id
    })
      .then(response => {
        if (response.data.aceptarAlquiler) {
          const updatedProperties = [...properties];
          updatedProperties[index].estadoSolicitud = "Aceptada";
          setProperties(updatedProperties);
        } else {
          console.error("Error al aceptar las solicitudes");
        }
      })
      .catch(error => {
        console.error("Error al aceptar las solicitudes:", error);
      });
  };

  const handleDeny = (index) => {
    const property = properties[index];
    axios.post('http://localhost:8080/denegarInquilinoAmenidad', {
      idAmenidad: property.id
    })
      .then(response => {
        if (response.data.denergarInquilino) {
          const updatedProperties = [...properties];
          updatedProperties[index].estadoSolicitud = "Denegada";
          setProperties(updatedProperties);
        } else {
          console.error("Error al negar las solicitudes");
        }
      })
      .catch(error => {
        console.error("Error al negar las solicitudes", error);
      });
  };

  return (
    <div className="propiedades">
      <h1 className="title">Solicitudes amenidades</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID Amenidad</th>
            <th>Cédula Propietario</th>
            <th>Cédula Inquilino</th>
            <th>Fecha solicitud</th>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {properties && properties.map((property, index) => (
            <tr key={index}>
              <td>{property.id}</td>
              <td>{property.cedulaP}</td>
              <td>{property.cedulaInq}</td>
              <td>{property.fechaSolicitud}</td>
              <td>{property.fechaInicio}</td>
              <td>{property.fechaFin}</td>
              <td>
                <span>
                  <a href="#" onClick={() => handleAccept(index)}>Aceptar</a>
                  {" | "}
                  <a href="#" onClick={() => handleDeny(index)}>Denegar</a>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VisualizarSolicitudA;
