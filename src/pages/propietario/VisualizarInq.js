import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

const getFecha = (fechaString) => {
  let fecha = new Date(fechaString.replaceAll("-", "/").replaceAll("T00:00:00.000Z", ""));
  return `${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate()}`;
}

function VisualizarInquilinos(props) {
  const { isLogin, setIsLogin } = props;
  const [properties, setProperties] = useState([]);
  const [amenidades, setAmenidades] = useState([]);
  const [editedRow, setEditedRow] = useState(null);
  const [interruptRow, setInterruptRow] = useState(null);
  const [evictionTime, setEvictionTime] = useState("");
  const [evictionReason, setEvictionReason] = useState("");
  const cedula = localStorage.getItem('user');

  useEffect(() => {
    if (isLogin) {
      axios.post('http://localhost:8080/visualizarInquilinosP', 
        { 
          cedula: cedula 
        })
        .then(response => {
          setProperties(response.data.recordset);
        })
        .catch(error => {
          console.error("Error al obtener propiedades:", error);
        });
      
      axios.post('http://localhost:8080/visualizarInquilinosA', 
        { 
          cedula: cedula 
        })
        .then(response => {
          setAmenidades(response.data.recordset);
        })
        .catch(error => {
          console.error("Error al obtener propiedades:", error);
        });
    } else {
      window.location.href = '/login';
    }
  }, [isLogin, setIsLogin]);

  const handleInterrupt = (index) => {
    setInterruptRow(index);
  };

  const handleEvictionSubmit = () => {
    if (evictionTime && evictionReason) {
      const property = properties[interruptRow];
      axios.post('http://localhost:8080/editarInquilinoP', {
        cedulaPropietario: property.cedulaP,
        cedulaInquilino: property.cedulaInq,
        newMonth: evictionTime,
        contenido: evictionReason,
        idPropiedad: property.id
      })
        .then(response => {
          if (response.data.interrumpirAlquiler) {
            console.log("Alquiler interrumpido exitosamente");
          } else {
            console.error("Error al interrumpir el alquiler");
          }
        })
        .catch(error => {
          console.error("Error al interrumpir el alquiler:", error);
        });
    } else {
      alert("Por favor ingrese tanto el tiempo como la razón de desalojo.");
    }
  };

  return (
    <div className="propiedades">
      <h1 className="title">Visualizar inquilinos</h1>
      <h2 className="subtitle">Propiedades</h2>
      <div className="table-contenedor">
        <table className="table">
          <thead>
            <tr>
              <th>ID Propiedad</th>
              <th>Cedula</th>
              <th>Correo</th>
              <th>Nombre</th>
              <th>Primer apellido</th>
              <th>Segundo apellido</th>
              <th>Telefono</th>
              <th>Fecha Inicio</th>
              <th>Fecha Final</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            { properties?.map((property, index) => (
              <tr key={index}>
                <td>{property.idPropiedad}</td>
                <td>{property.cedula}</td>
                <td>{property.correo}</td>
                <td>{property.nombre}</td>
                <td>{property.apellido1}</td>
                <td>{property.apellido2}</td>
                <td>{property.telefono}</td>
                <td>{getFecha(property.fechaInicio)}</td>
                <td>{getFecha(property.fechaFin)}</td>
                <td>
                  <span>
                    <a href="#" onClick={() => handleInterrupt(index)}>Interrumpir</a>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {interruptRow !== null && (
        <div className="eviction-form">
          <h3>Interrumpir Inquilino</h3>
          <label>
            Tiempo de desalojo (meses):
            <input
              type="number"
              value={evictionTime}
              onChange={(e) => setEvictionTime(e.target.value)}
              className="inputBox"
            />
          </label>
          <label>
            Razón de desalojo:
            <textarea
              value={evictionReason}
              onChange={(e) => setEvictionReason(e.target.value)}
              className="inputBox"
            />
          </label>
          <button onClick={handleEvictionSubmit}>Enviar</button>
        </div>
      )}
      <br/>
      <h2 className="subtitle">Amenidades</h2>
      <div className="table-contenedor">
        <table className="table">
          <thead>
            <tr>
              <th>ID Amenidad</th>
              <th>Cedula</th>
              <th>Correo</th>
              <th>Nombre</th>
              <th>Primer apellido</th>
              <th>Segundo apellido</th>
              <th>Telefono</th>
              <th>Fecha Inicio</th>
              <th>Fecha Final</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            { amenidades?.map((property, index) => (
              <tr key={index}>
                <td>{property.idAmenidad}</td>
                <td>{property.cedula}</td>
                <td>{property.correo}</td>
                <td>{property.nombre}</td>
                <td>{property.apellido1}</td>
                <td>{property.apellido2}</td>
                <td>{property.telefono}</td>
                <td>{getFecha(property.fechaInicio)}</td>
                <td>{getFecha(property.fechaFin)}</td>
                <td>
                  {/* TODO: Duplicar todo lo de interrumpir para que funcione para amenidades, no solo para propiedades  */}
                  <span>
                    <a href="#" onClick={() => handleInterrupt(index)}>Interrumpir</a>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {interruptRow !== null && (
        <div className="eviction-form">
          <h3>Interrumpir Inquilino</h3>
          <label>
            Tiempo de desalojo (meses):
            <input
              type="number"
              value={evictionTime}
              onChange={(e) => setEvictionTime(e.target.value)}
              className="inputBox"
            />
          </label>
          <label>
            Razón de desalojo:
            <textarea
              value={evictionReason}
              onChange={(e) => setEvictionReason(e.target.value)}
              className="inputBox"
            />
          </label>
          <button onClick={handleEvictionSubmit}>Enviar</button>
        </div>
      )}
    </div>
  );
}

export default VisualizarInquilinos;
