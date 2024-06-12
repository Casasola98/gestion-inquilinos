import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function PropiedadesP(props) {
  const { isLogin} = props;
  const [formData, setFormData] = useState({ 
    cedula: localStorage.getItem('user'), 
    idSolicitud: "",
    idPropiedad: "",
    descripcionProblema: "",
    idPrioridad: "",
    idProveedor: "",
    costoMantenimiento: "",
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
    console.log(4,4,4,4,4,4);
    const { idSolicitud, idPropiedad, descripcionProblema, idPrioridad, idProveedor, cedula, costoMantenimiento} = formData;
    axios.post('http://localhost:8080/registrarMantenimiento', {
      idSolicitud: idSolicitud,
      idPropiedad: idPropiedad,
      descripcionProblema: descripcionProblema,
      idPrioridad: idPrioridad,
      idProveedor: idProveedor,
      cedula: cedula,
      costoMantenimiento: costoMantenimiento
    })
    .then((response) => {
      console.log(4, response)
      if (response.data.registrarMantenimiento) {
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
      { label: "ID solicitud:", type: "number", name:"idSolicitud" },
      { label: "ID propiedad:", type: "number", name: "idPropiedad" },
      { label: "Descripción del problema:", type: "text", name: "descripcionProblema" },
      { label: "Prioridad:", type: "number", extraLabel: "1: Baja 2: Media 3: Alta", name: "idPrioridad" },
      { label: "Proveedor:", type: "number", extraLabel: "1: Electricista 2: Jardinero 3: Carpintero 4: Plomero 5: Pintor", name:"idProveedor" },
      { label: "Costo:", type: "number",  name:"costoMantenimiento" },
    ];

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
                  name={field.name}
                  className="inputBox"
                  placeholder={`Ingrese ${field.label}`}
                  value={formData[field.name]} // Asigna el valor correspondiente del estado 
                  onChange={handleChange}              
                />
                <br />
                {field.extraLabel && (
                  <>
                    <label htmlFor={`extraLabel${index}`} className="extraLabel">{field.extraLabel}</label>
                    <br />
                  </>
                )}
                <br />
              </div>
            ))}
          </div>
          <button className="option-link" type="button" onClick={handleRegister}>
            Registrar
          </button>
        </div>
      </div>
    );
  }


export default PropiedadesP;
