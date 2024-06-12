import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function Enviar(props) {
  const { isLogin } = props;
  const [formData, setFormData] = useState({
    idMensaje: "",
    cedulaReceptor: "",
    contenido: ""
  });
  const [registroExitoso, setRegistroExitoso] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      window.location.href = '/login';
    }
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios.post('http://localhost:8080/enviarMensaje', formData)
      .then((response) => {
       if (response.data.enviarMensaje) {
        setRegistroExitoso(true);
      } else {
        setRegistroExitoso(false);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      setRegistroExitoso(false);
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
