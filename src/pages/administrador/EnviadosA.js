import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';



const getHora = (fecha) => {
	return `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
}

function Enviados(props) {
  const { isLogin } = props;
  const [messages, setMessages] = useState([]);
  const cedula = localStorage.getItem('user');

  // Si nadie ha iniciado sesión, lo envía a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }


  useEffect(() => {
    if (isLogin) {
      // Reemplaza "cedulaDelUsuario" con la cédula del usuario logueado
      axios.post('http://localhost:8080/visualizarMsjAdmin', { cedula })
        .then(response => {
          setMessages(response.data.recordset);
        })
        .catch(error => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [isLogin]);

  if(isLogin){ 
    return (
    <div className="comunicaciones">
      <h1 className="title">Mensajes Enviados</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Cedula del receptor</th>
            <th>Cedula del emisor</th>
            <th>Hora de envío</th>
            <th>Contenido</th>
          </tr>
        </thead>
        <tbody>
          {messages?.map(function (message, index) {
            return (
            <tr key={index}>
              <td>{message.cedulaReceptor}</td>
              <td>{message.cedulaEmisor}</td>
              <td>{getHora(new Date(message.horaMensaje))}</td>
              <td>{message.contenido}</td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
}
}
export default Enviados;
