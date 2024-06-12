import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function Enviados(props) {
  const { isLogin } = props;

  // Si nadie ha iniciado sesión, lo envía a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (isLogin) {
      // Reemplaza "cedulaDelUsuario" con la cédula del usuario logueado
      const cedula = "cedulaDelUsuario"; 

      axios.post('http://localhost:8080/visualizarMsjEnviados', { cedula })
        .then(response => {
          setMessages(response.data.recordset);
        })
        .catch(error => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [isLogin]);

  return (
    <div className="comunicaciones">
      <h1 className="title">Mensajes Enviados</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Cédula del receptor</th>
            <th>Fecha de envío</th>
            <th>Hora de envío</th>
            <th>Contenido</th>
          </tr>
        </thead>
        <tbody>
          {messages?.map((message, index) => (
            <tr key={index}>
              <td>{message.cedulaReceptor}</td>
              <td>{message.fechaEnvio}</td>
              <td>{message.horaEnvio}</td>
              <td>{message.contenido}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Enviados;
