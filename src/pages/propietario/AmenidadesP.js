import React, { useState,useEffect } from "react";
import axios from "axios";
import '../../css/Propiedades.css';

function PropiedadesP(props) {
  const { isLogin, setIsLogin } = props;
  const [formData, setFormData] = useState({
    cedula: localStorage.getItem('user'),
    idAmenidad: "",
    tipoAmenidad: "",
    costoUso: "",
    descripcion: "",
    estadoActual: "",
    estado: "",
  });


  // Si nadie ha iniciado sesión lo envía a la ventana de login
  useEffect(() => {
    if (!isLogin) {
      window.location.href = '/login';
    }
  }, [isLogin]);


  // Estado para los valores de los campos de texto
  

  // Manejar el cambio de valor de los campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Manejar el clic en el botón "Registrar"
  const handleRegister = () => {
    const { idAmenidad, tipoAmenidad, descripcion, costoUso, estado, estadoActual,cedula} = formData;
    axios.post('http://localhost:8080/crearAmenidad', {
      idAmenidad: idAmenidad,
      tipoAmenidad: tipoAmenidad,
      costoUso: costoUso,
      descripcion: descripcion,
      estadoActual: estadoActual,
      estado: estado,
      cedula: cedula 
    })
    .then((response) => {
      if (response.data.registrarPropiedad) {
        alert("Registro exitoso");

      } else {
       
        alert("Error al registrar la amenidad");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      //alert("Error al conectar con el servidor");
    });
  };

  // Lista de etiquetas para los campos de texto y tipos
  const fields = [
    { label: "ID de amenidad:", type: "number", name: "idAmenidad"},
    { label: "Descripción", type: "text",  name: "descripcion" },
    { label: "Costo de uso:", type: "number", name: "costoUso" },
    { label: "Estado", type: "text", name: "estado"},
    { label: "Tipo", type: "text", name: "tipoAmenidad" },
    { label: "Estado actual", type: "number", name: "estadoActual" ,extraLabel: "1: Disponible 2:Ocupado 3:Dañado" } 
  ];
  return (
    <div className="propiedades">
      <h1 className="title">Amenidades</h1>
      <div className="register-section">
        <div className="form-container">
          {fields?.map((field, index) => (
            <div className="form-group" key={index}>
              <label htmlFor={`inputField${index}`}>{field.label}</label>
              <br />
              <input
                type={field.type}
                id={`inputField${index}`}
                name={field.name}
                className="inputBox"
                placeholder={`Ingrese ${field.label.toLowerCase()}`}
                value={formData[field.name]} // Asigna el valor correspondiente del estado
                onChange={handleChange}
              />
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
