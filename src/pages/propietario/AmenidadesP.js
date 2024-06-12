import React, { useState } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function PropiedadesP(props) {
  const { isLogin, setIsLogin } = props;

  // Si nadie ha iniciado sesión lo envía a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  // Lista de etiquetas para los campos de texto y tipos
  const fields = [
    { label: "ID de amenidad:", type: "number" },
    { label: "Descripción", type: "text" },
    { label: "Costo de uso:", type: "number" },
    { label: "Estado", type: "text"},
    { label: "Tipo", type: "text" },
    { label: "Estado actual", type: "number", extraLabel: "1: Disponible 2:Ocupado 3:Dañado" } 
  ];

  // Estado para los valores de los campos de texto
  const [formData, setFormData] = useState({
    idAmenidad: "",
    descripcion: "",
    costoUso: "",
    estado: "",
    tipo: "",
    estadoActual: ""
  });

  // Manejar el cambio de valor de los campos de texto
  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  // Manejar el clic en el botón "Registrar"
  const handleRegister = () => {
    axios.post('http://localhost:8080/crearAmenidad', {
      idAmenidad: formData.idAmenidad,
      tipoAmenidad: formData.tipo,
      costoUso: formData.costoUso,
      descripcion: formData.descripcion,
      estadoActual: formData.estadoActual,
      estado: formData.estado,
      cedula: 'cedulaPropietario' 
    })
    .then(response => {
      if (response.data.registrarPropiedad) {
        alert("Amenidad registrada exitosamente");
      } else {
        alert("Error al registrar la amenidad");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    });
  };

  return (
    <div className="propiedades">
      <h1 className="title">Amenidades</h1>
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
                value={formData[field.label.split(' ')[0].toLowerCase()]} // Asigna el valor correspondiente del estado
                onChange={(e) => handleChange(e, field.label.split(' ')[0].toLowerCase())} // Maneja el cambio de valor
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
        <button className="option-link" type="button" onClick={handleRegister}>
          Registrar
        </button>
      </div>
    </div>
  );
}

export default PropiedadesP;
