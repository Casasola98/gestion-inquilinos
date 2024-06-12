import React, { useState } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function Enviar(props) {
  const { isLogin } = props;

  // Si nadie ha iniciado sesión, lo envía a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    idMensaje: "",
    cedulaReceptor: "",
    contenido: ""
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const cedula = "cedulaDelEmisor"; 
//CONEXION CON BE
    axios.post('http://localhost:8080/enviarMensaje', {
      //envia los datos de los campos
      cedulaReceptor: formData.cedulaReceptor,
      cedula: cedula,
      contenido: formData.contenido
    })
    .then(response => {
      if (response.data.enviarMensaje) {
        alert("Mensaje enviado exitosamente");
      } else {
        alert("Error al enviar el mensaje");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    });
  };

  // Lista de etiquetas para los campos de texto y tipos
  const fields = [
    { label: "ID del mensaje:", type: "number", id: "idMensaje" },
    { label: "Cédula del receptor:", type: "number", id: "cedulaReceptor" },
    { label: "Contenido:", type: "text", id: "contenido" }
  ];

  return (
    <div className="comunicaciones">
      <div className="register-section">
        <h2 className="title">Enviar mensaje</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div className="form-group" key={index}>
              <label htmlFor={field.id}>{field.label}</label>
              <br />
              <input
                type={field.type}
                id={field.id}
                className="inputBox"
                placeholder={`Ingrese ${field.label.toLowerCase()}`}
                value={formData[field.id]}
                onChange={handleChange}
              />
              <br />
            </div>
          ))}
          <button className="option-link" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Enviar;
