import React, { useState } from "react";
import '../../css/Propiedades.css';

function VisualizarAme(props) {
  const { isLogin, setIsLogin } = props;
  const [amenidades, setAmenidades] = useState([
    { id: 1, costo: 100, tipo: "Gimnasio", descripción: "Gimnasio completamente equipado", estado: 1 },
    { id: 2, costo: 50, tipo: "Piscina", descripción: "Piscina climatizada", estado: 2 }
  ]);


  return (
    <div className="propiedades">
      <h1 className="title">Visualizar amenidades</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID amenidad</th>
            <th>Costo</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {amenidades.map((amenidad, index) => (
            <tr key={index}>
              <td>{amenidad.id}</td>
              <td>{ amenidad.costo}</td>
              <td>{amenidad.tipo}</td>
              <td>{ amenidad.descripción}</td>
              <td>{amenidad.estado}</td>
        
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VisualizarAme;
