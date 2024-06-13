import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function Enviar(props) {
  const { isLogin } = props;  
  const [formData, setFormData] = useState({
    cedulaEmisor: "",
    cedulaReceptor: "",
    contenido: ""
  });

  useEffect(() => {
    if (!isLogin) {
      window.location.href = '/login';
    }
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const { cedulaEmisor, cedulaReceptor, contenido} = formData;
    axios.post('http://localhost:8080/enviarMensajeAdmin', {
      cedulaEmisor: cedulaEmisor,
      cedulaReceptor: cedulaReceptor,
      contenido: contenido
    })
  
      .then((response) => {
       if (response.data.enviarMensaje) {
        alert("Mensaje enviado");
      } else {
        alert("Error al enviar mensaje");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  // Lista de etiquetas para los campos de texto y tipos
  const fields = [
    { label: "Cédula del receptor:", type: "number", name: "cedulaReceptor" },
    { label: "Contenido:", type: "text", name: "contenido"  },
    { label: "Cédula del emisor:", type: "number" , name: "cedulaEmisor" },
  ];

  return (
    <div className="comunicaciones">
      <div className="register-section">
        <h2 className="title">Enviar mensaje</h2>
        <div className="form-container">
          {fields.map((field, index) => (
            <div className="form-group" key={index}>
              <label htmlFor={`inputField${index}`}>{field.label}</label>
              <br />
              <input
                type={field.type}
                id={`inputField${index}`}
                name={field.name}
                className="inputBox"
                placeholder={`Ingrese ${field.label}`}
                value={formData[field.name]}
                onChange={handleChange}
              />
              <br />
            </div>
          ))}
          </div>
          <button className="option-link" type="button" onClick={handleSubmit}>
            Enviar
          </button>
        </div>
      </div>
  );
}

export default Enviar;
