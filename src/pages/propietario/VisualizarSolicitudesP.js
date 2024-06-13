import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

const getFecha = (fechaString) => {
  let fecha = new Date(fechaString.replaceAll("-", "/").replaceAll("T00:00:00.000Z", ""));
  return `${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate()}`;
}

function VisualizarSolicitud(props) {
  const { isLogin, setIsLogin } = props;
  const [properties, setProperties] = useState([]);
  const cedula = localStorage.getItem('user');

  useEffect(() => {
    if (isLogin) {
      axios.post('http://localhost:8080/visualizarSolicitudesP',
        {
          cedula: cedula
        })
        .then(response => {
          setProperties(response.data.recordset);
        })
        .catch(error => {
          console.error("Error al obtener propiedades:", error);
        });
    } else {
      window.location.href = '/login';
    }
  }, [isLogin, setIsLogin]);

  const handleAccept = (property) => {
    axios.post('http://localhost:8080/crearInquilinoPropiedad', {
      cedula: property.cedulaInquilino,
      fechaInicio: getFecha((property.fechaInicio)),
      fechaFin: getFecha((property.FechaFin)),
      fechaSolicitud: getFecha((property.fechaSolicitud)),
      idPropiedad: property.idPropiedad
    })
      .then(response => {
        if (response.data.editarPropiedad) {
          axios.post('http://localhost:8080/visualizarSolicitudesP',
            {
              cedula: cedula
            })
            .then(response => {
              setProperties(response.data.recordset);
            })
            .catch(error => {
              console.error("Error al obtener propiedades:", error);
            });
        } else {
          console.error("Error al aceptar las solicitudes");
        }
      })
      .catch(error => {
        console.error("Error al aceptar las solicitudes:", error);
      });
  };

  const handleDeny = (property) => {
    axios.post('http://localhost:8080/denegarInquilinoPropiedad', {
      cedula: property.cedulaInquilino,
      fechaInicio: getFecha((property.fechaInicio)),
      fechaFin: getFecha((property.FechaFin)),
      fechaSolicitud: getFecha((property.fechaSolicitud)),
      idPropiedad: property.idPropiedad
    })
      .then(response => {
        if (response.data.denergarInquilino) {
          axios.post('http://localhost:8080/visualizarSolicitudesP',
            {
              cedula: cedula
            })
            .then(response => {
              setProperties(response.data.recordset);
            })
            .catch(error => {
              console.error("Error al obtener propiedades:", error);
            });
        } else {
          console.error("Error al negar las solicitudes");
        }
      })
      .catch(error => {
        console.error("Error al negar las solicitudes:", error);
      });
  };

  return (
    <div className="propiedades">
      <h1 className="title">Solicitudes Propiedades</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID Propiedad</th>
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
              <td>{property.idPropiedad}</td>
              <td>{property.cedulaPropietario}</td>
              <td>{property.cedulaInquilino}</td>
              <td>{getFecha((property.fechaSolicitud))}</td>
              <td>{getFecha((property.fechaInicio))}</td>
              <td>{getFecha((property.FechaFin))}</td>
              <td>
                <span>
                  <a href="#" onClick={() => handleAccept(property)}>Aceptar</a>
                  {" | "}
                  <a href="#" onClick={() => handleDeny(property)}>Denegar</a>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VisualizarSolicitud;
