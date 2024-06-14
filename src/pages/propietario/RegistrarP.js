import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';


function RegistrarP(props) {
  const { isLogin } = props;
  const [formData, setFormData] = useState({
    idPropiedad: "",
    direccion: "",
    idTipoPropiedad: "",
    numeroHabitaciones: "",
    tamanoMetros: "",
    descripcion: "",
    estadoActual: "",
    precioAlquiler: "",
    cedula: localStorage.getItem('user')
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
 //conexión con la función del backend
  const handleSubmit = () => {
    const { cedula, idPropiedad, direccion, idTipoPropiedad, numeroHabitaciones, tamanoMetros,descripcion, estadoActual,precioAlquiler} = formData;
    axios.post('http://localhost:8080/crearPropiedad', {
      cedula:cedula,
      idPropiedad: idPropiedad,
      direccion: direccion, 
      idTipoPropiedad: idTipoPropiedad,
      numeroHabitaciones: numeroHabitaciones, 
      tamanoMetros: tamanoMetros, 
      descripcion: descripcion, 
      estadoActual: estadoActual,
      precioAlquiler: precioAlquiler
    })
      .then((response) => {
        if (response.data.registrarPropiedad) {
          alert("Registro exitoso");

        } else {
          alert("Error al registrar la propiedad");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
  
      });
  };

  const fields = [
    { label: "ID Propiedad", type: "number", name: "idPropiedad" },
    { label: "Dirección", type: "text", name: "direccion" },
    { label: "Tipo de Propiedad", type: "number", extraLabel: "1: Apartamento 2: Casa 3: Oficina", name: "idTipoPropiedad" },
    { label: "Número de Habitaciones", type: "number", name: "numeroHabitaciones" },
    { label: "Tamaño (metros)", type: "number", name: "tamanoMetros" },
    { label: "Descripción", type: "text", name: "descripcion" },
    { label: "Estado Actual", type: "number", extraLabel: "1: Disponible 2: Ocupado 3: En mantenimiento", name: "estadoActual" },
    { label: "Precio de Alquiler", type: "number", name: "precioAlquiler" },
  
  ];

  return (
    <div className="propiedades">
      <h1 className="title">Registrar Propiedad</h1>
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
        <button className= "option-link" type="button" onClick={handleSubmit}>
          Registrar
        </button>
      </div>
    </div>
  );
}

export default RegistrarP;
