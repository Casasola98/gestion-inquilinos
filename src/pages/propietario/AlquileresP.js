import React, { useState } from "react";
import '../../css/Propiedades.css';

function VisualizarSolicitud(props) {
  const { isLogin, setIsLogin } = props;
  const [properties, setProperties] = useState([
    { id: 1, tipo: "casa", estadoSolicitud: "Pendiente", fechaSolicitud: "2023-01-01", fechaInicio: "2023-02-01", fechaFin: "2024-01-31" },
    { id: 2, tipo: "amenidad", estadoSolicitud: "Pendiente", fechaSolicitud: "2023-02-15", fechaInicio: "2023-03-01", fechaFin: "2024-02-28" }
  ]);

  const handleAccept = (index) => {
    const updatedProperties = [...properties];
    updatedProperties[index].estadoSolicitud = "Aceptado";
    setProperties(updatedProperties);
  };

  const handleDeny = (index) => {
    const updatedProperties = [...properties];
    updatedProperties[index].estadoSolicitud = "Denegado";
    setProperties(updatedProperties);
  };

  return (
    <div className="propiedades">
      <h1 className="title">Solicitudes de alquiler</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>Tipo</th>
            <th>Unidad de tiempo</th>
            <th>Costo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {properties?.map((property, index) => (
            <tr key={index}>
              <td>{property.fechaInicio}</td>
              <td>{property.fechaFin}</td>
              <td>{property.tipo}</td>
              <td>{property.estadoSolicitud}</td>
              <td>{property.fechaSolicitud}</td>
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

export default VisualizarSolicitud;
