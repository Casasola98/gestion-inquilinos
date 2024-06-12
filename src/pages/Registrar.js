import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Login.css";

function Registrar(props) {
  const { isLogin, setIsLogin } = props; 
  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    telefono: "",
    correo: "",
    rol: "inquilino"
  });

  useEffect(() => {
    if (isLogin) {
      window.location.href = "/";
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
    const { cedula, nombre, apellido1, apellido2, telefono, correo, rol } = formData;
//conexion con la funcion del backend
    axios.post('http://localhost:8080/registrar', {
      //toma los datos de los campos
      cedula: cedula,
      nombre: nombre,
      apellido1: apellido1,
      apellido2: apellido2,
      telefono: telefono,
      correo: correo,
      rol: rol
    })
      .then((response) => {
        if (response.data.registrarAdmin) {
          //Esto es solo para el login, esto es lo que guarda los datos del usuario al iniciar sesion
          // localStorage.setItem('user', cedula);
          // localStorage.setItem('tipoUsuario', rol);
          // setIsLogin(localStorage.getItem('user'));
          //En vez de esas 3 lineas de arriba se deberia enseñar una ventanita emergente "popup" que diga que el usuario se creo exitosamente
          //Y enviar a la ventana de login de nuevo
        } else {
          //popup que indique que el usuario no se pudo crear
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fields = [
    { label: "Ingrese su cédula:", type: "number", name: "cedula" },
    { label: "Nombre:", type: "text", name: "nombre" },
    { label: "Apellido 1:", type: "text", name: "apellido1" },
    { label: "Apellido 2", type: "text", name: "apellido2" },
    { label: "Télefono:", type: "number", name: "telefono" },
    { label: "Correo:", type: "text", name: "correo" }
  ];

  return (
    <div className="propiedades">
      <h1 className="title">Registrar nuevo usuario</h1>
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
                placeholder={`Ingrese ${field.label.toLowerCase()}`}
                value={formData[field.name]}
                onChange={handleChange}
              />
              <br />
            </div>
          ))}
          <div className="form-group">
            <label htmlFor="rolSelect">Rol:</label>
            <br />
            <select
              id="rolSelect"
              name="rol"
              className="inputBox"
              value={formData.rol}
              onChange={handleChange}
            >
              <option value="admin">Administrador</option>
              <option value="propietario">Propietario</option>
              <option value="inquilino">Inquilino</option>
            </select>
            <br />
          </div>
        </div>
        <button className="option-link" type="button" onClick={handleSubmit}>
          Registrar
        </button>
      </div>
    </div>
  );
}

export default Registrar;
