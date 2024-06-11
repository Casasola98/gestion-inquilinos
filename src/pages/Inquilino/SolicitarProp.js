import React, { useState, useEffect } from "react";
import '../../css/Propiedades.css';

function RegistrarP(props) {
  const { isLogin, setIsLogin } = props;

  // Si nadie ha iniciado sesion lo envia a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  if (isLogin) {
    // Lista de etiquetas para los campos de texto y tipos
    const fields = [
      { label: "ID Propiedad", type: "number" },
      { label: "Dirección", type: "text" },
      { label: "Tipo de Propiedad", type: "text" },
      { label: "Número de Habitaciones", type: "number" },
      { label: "Tamaño", type: "text" },
      { label: "Descripción", type: "text" },
      { label: "Precio", type: "number" },
      { label: "Estado", type: "number", extraLabel: "1: Disponible 2:Ocupado 3:En mantenimiento" },
      { label: "Cédula propietario", type: "number" }
    ];

    return (
      <div className="propiedades">
        <h1 className="title">Solicitar Propiedad</h1>
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
            Solicitar
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
