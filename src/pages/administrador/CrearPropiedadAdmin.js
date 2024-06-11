import React, { useState, useEffect } from "react";
import '../../css/Propiedades.css';

function RegistrarP(props) {
  const { isLogin, setIsLogin } = props;

  // Si nadie ha iniciado sesión lo envía a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  if (isLogin) {
    // Lista de etiquetas para los campos de texto y tipos
    const fields = [
      { label: "ID Propiedad", type: "number" },
      { label: "Tipo de Propiedad", type: "text", extraLabel: "1: Apartamento 2:Casa 3:Oficina", pattern: "^[1-3]$" },
      { label: "Tamaño", type: "text" },
      { label: "Descripción", type: "text" },
      { label: "Precio", type: "number" },
      { label: "Dirección", type: "text" },
      { label: "Número de Habitaciones", type: "number" },
      { label: "Estado actual", type: "number", extraLabel: "1: Disponible 2:Ocupado 3:En mantenimiento", pattern: "^[1-3]$" },
      { label: "Cédula:", type: "number" },
    ];

    const handleValidation = (event, pattern) => {
      const value = event.target.value;
      if (!new RegExp(pattern).test(value)) {
        event.target.setCustomValidity("Por favor ingrese un valor válido.");
      } else {
        event.target.setCustomValidity("");
      }
    };

    return (
      <div className="propiedades">
        <h1 className="title">Crear Propiedad</h1>
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
                  pattern={field.pattern}
                  onInput={(e) => field.pattern && handleValidation(e, field.pattern)}
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

  return (
    <div className="home"></div>
  );
}

export default RegistrarP;
