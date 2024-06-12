import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function PropiedadesP(props) {
  const { isLogin, setIsLogin } = props;
  const [formData, setFormData] = useState({ 
     idSolicitud: "",
     idpropiedad: "",
     descripcionProblema: "",
     comentarios: "",
     prioridad: "",
     proveedor: "",
  });

 // Si nadie ha iniciado sesión lo envía a la ventana de login
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

  // Manejar el clic en el botón "Registrar"
  const handleRegister = () => {
    const { idSolicitud, idpropiedad, descripcionProblema, comentarios, prioridad, proveedor} = formData;
    axios.post('http://localhost:8080/registrarMantenimiento', {
      idSolicitud: idSolicitud,
      idpropiedad: idpropiedad,
      descripcionProblema: descripcionProblema,
      comentarios: comentarios,
      prioridad: prioridad,
      proveedor: proveedor,
    })
    .then((response) => {
      if (response.data.registrarPropiedad) {
        alert("Registro exitoso");

      } else {
       
        alert("Error al registrar la solicitud");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      //alert("Error al conectar con el servidor");
    });
  };

    // Lista de etiquetas para los campos de texto y tipos
    const fields = [
      { label: "ID solicitud:", type: "number" },
      { label: "ID propiedad:", type: "number" },
      { label: "Descripción del problema:", type: "text" },
      { label: "Comentarios:", type: "text" },
      { label: "Prioridad:", type: "number", extraLabel: "1: Baja 2: Media 3: Alta" },
      { label: "Proveedor:", type: "number", extraLabel: "1: Electricista 2: Jardinero 3: Carpintero 4: Plomero 5: Pintor" },

    ]

    return (
      <div className="propiedades">
        <h1 className="title">Registrar solicitud de mantenimiento</h1>
        <div className="register-section">
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
            Registrar
          </button>
        </div>
      </div>
    );
  }


export default PropiedadesP;
