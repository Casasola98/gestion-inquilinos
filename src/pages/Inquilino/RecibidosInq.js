import React from "react";
import '../../css/Propiedades.css';

function Recibidos(props) {
  const { isLogin } = props;

  // Si nadie ha iniciado sesión, lo envía a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  if (isLogin) {
    return (
      <div className="comunicaciones">
        <h1 className="title">Mensajes Recibidos</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Cédula del emisor</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Contenido</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
              <td>Mexico</td>
            </tr>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="home"></div>
  );
}

export default Recibidos;
