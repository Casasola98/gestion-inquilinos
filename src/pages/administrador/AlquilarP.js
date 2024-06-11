import React, { useState } from "react";
import '../../css/Amenidades.css';

function VisualizarAme(props) {
  const { isLogin, setIsLogin } = props;
  const [amenidades, setAmenidades] = useState([
    { id: 1, costo: 100, tipo: "Gimnasio", descripción: "Gimnasio completamente equipado", estado: 1 },
    { id: 2, costo: 50, tipo: "Piscina", descripción: "Piscina climatizada", estado: 2 }
  ]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');

  const handleConsultar = () => {
    // Lógica para consultar amenidades en las fechas dadas
    console.log(`Consultar desde ${fechaInicio} hasta ${fechaFinal}`);
  };

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
            <th>Tanaño</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Nombre propietario</th>
            <th>Apellido1 propietario</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {amenidades.map((amenidad, index) => (
            <tr key={index}>
              <td>{amenidad.id}</td>
              <td>{amenidad.tipo}</td>
              <td>{amenidad.descripción}</td>
              <td>{amenidad.costo}</td>
              <td>{amenidad.estado}</td>
              <td>{amenidad.opciones}</td>
              <td>Cédula del propietario</td>
              <td>Nombre del propietario</td>
              <td>Apellido del propietario</td>
              <td>Correo del propietario</td>
              <td>Teléfono del propietario</td>
              <td>
                <a href="#">Solicitar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VisualizarAme;
