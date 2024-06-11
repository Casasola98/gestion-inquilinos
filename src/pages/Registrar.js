import React from "react";
import "../css/Login.css";

function Registrar(props) {
  const { isLogin } = props;

  // Si hay una sesión iniciada, redirige a la página de inicio
  if (isLogin) {
    window.location.href = "/";
    return null; // Evita renderizar el resto del componente
  }

  // Lista de etiquetas para los campos de texto y tipos
  const fields = [
    { label: "Ingrese su cédula:", type: "number" },
    { label: "Nombre:", type: "text" },
    { label: "Apellido 1:", type: "text" },
    { label: "Apellido 2", type: "text" },
    { label: "Télefono:", type: "number" },
    { label: "Correo:", type: "text" }
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
                className="inputBox"
                placeholder={`Ingrese ${field.label.toLowerCase()}`}
              />
              <br />
            </div>
          ))}
          <div className="form-group">
            <label htmlFor="rolSelect">Rol:</label>
            <br />
            <select id="rolSelect" className="inputBox">
              <option value="admin">Administrador</option>
              <option value="propietario">Propietario</option>
              <option value="inquilino">Inquilino</option>
            </select>
            <br />
          </div>
        </div>
        <button className="option-link" type="button">
          Registrar
        </button>
      </div>
    </div>
  );
}

export default Registrar;
