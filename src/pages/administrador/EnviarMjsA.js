import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function Enviar(props) {
  const { isLogin } = props;  
  const [formData, setFormData] = useState({
    cedula: "",
    cedulaReceptor: "",
    cedulaEmisor: "",
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
    const { cedula, cedulaReceptor,cedulaEmisor, contenido} = formData;
    axios.post('http://localhost:8080/enviarMensaje', {
      cedula: cedula,
      cedulaReceptor: cedulaReceptor,
      cedulaEmisor: cedulaEmisor,
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
      { label: "ID del mensaje:", type: "number" },
      { label: "Cédula del receptor:", type: "number" },
      { label: "Contenido:", type: "text" },
      { label: "Cédula del emisor:", type: "text" },

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
                  className="inputBox"
                  placeholder={`Ingrese ${field.label.toLowerCase()}`}
                  value={formData[field.name]}
                  onChange={handleChange}  
                />
                <br />
                {field.extraLabel && (
                  <>
                    <label htmlFor={`extraLabel${index}`} className="extraLabel">{field.extraLabel}</label>
                    <br />
                  </>
                )}
              </div>
            ))}
          </div>
          <button className="option-link" type="button">
            Enviar
          </button>
        </div>
      </div>
    );
  }

export default Enviar;
