import React, { useState, useEffect } from "react";
import '../../css/Propiedades.css';

function PropiedadesP(props) {
  const { isLogin, setIsLogin } = props;

  // Si nadie ha iniciado sesion lo envia a la ventana de login
  if (!isLogin) {
    window.location.href = '/login';
  }

  if (isLogin) {
    // Lista de etiquetas para los campos de texto y tipos
    const fields = [
      { label: "Cédula del inquilino", type: "number" },
      { label: "Nombre", type: "text" },
      { label: "Apellido 1", type: "text" },
      { label: "Apellido 2", type: "text" },
      { label: "Télefono", type: "number" },
      { label: "Correo", type: "text" },
      { label: "ID Propiedad", type: "number" },
      { label: "Fecha Inicio", type: "number" },
      { label: "Fecha Fin", type: "number" }
    ];

    return (
      <div className="propiedades">
        <h1 className="title">Visualizar inquilinos</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Cédula del inquilino:</th>
              <th>Nombre</th>
              <th>Apellido 1</th>
              <th>Apellido 2</th>
              <th>Télefono</th>
              <th>Correo</th>
              <th>ID Propiedad</th>
              <th>Fecha Inicio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
              <td>Mexico</td>
            </tr>
          </tbody>
        </table>
        <div className="register-section">
          <h2 className="title">Registrar inquilino</h2>
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
          <button className="option-link" type="button">
            Editar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home"></div>
  );
}

export default PropiedadesP;
